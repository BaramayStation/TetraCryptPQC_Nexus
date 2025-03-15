
/**
 * TetraCryptPQC Secure Caching
 * 
 * Provides encrypted local caching for network data with automatic
 * expiration and compartmentalized access.
 */

import { SecureCompartment, SecurityLevel } from "./compartment";
import { hashWithSHA3 } from "../crypto";

interface CacheOptions {
  ttl: number; // Time to live in milliseconds
  securityLevel: SecurityLevel;
  compressionEnabled?: boolean;
}

interface CacheEntry<T> {
  data: T;
  expires: number;
  securityLevel: SecurityLevel;
}

export class SecureCache {
  private compartment: SecureCompartment<CacheEntry<any>>;
  private defaultOptions: CacheOptions = {
    ttl: 1000 * 60 * 5, // 5 minutes default TTL
    securityLevel: "confidential",
    compressionEnabled: true
  };
  
  constructor(userId: string, userRole: string) {
    // Create a cache-specific compartment
    this.compartment = new SecureCompartment<CacheEntry<any>>(
      "secure-cache-" + userId,
      {
        roles: [userRole],
        userIds: [userId],
        compartmentId: "secure-cache",
        securityLevel: "confidential",
        needToKnow: false
      }
    );
  }
  
  async set<T>(key: string, data: T, options?: Partial<CacheOptions>): Promise<boolean> {
    const mergedOptions = { ...this.defaultOptions, ...(options || {}) };
    
    // Create cache entry with expiration
    const entry: CacheEntry<T> = {
      data,
      expires: Date.now() + mergedOptions.ttl,
      securityLevel: mergedOptions.securityLevel
    };
    
    // Store in the secure compartment
    return await this.compartment.set(key, entry);
  }
  
  async get<T>(key: string): Promise<T | null> {
    try {
      const entry = await this.compartment.get(key) as CacheEntry<T>;
      
      // Check if entry exists and is not expired
      if (!entry || entry.expires < Date.now()) {
        return null;
      }
      
      return entry.data;
    } catch (error) {
      console.error(`Failed to get cached item: ${key}`, error);
      return null;
    }
  }
  
  async invalidate(key: string): Promise<boolean> {
    return await this.compartment.set(key, null);
  }
  
  async invalidateAll(): Promise<boolean> {
    return await this.compartment.purge();
  }
}

// Factory function to create and access secure caches
let cacheInstances: Map<string, SecureCache> = new Map();

export function getSecureCache(userId: string, userRole: string): SecureCache {
  const cacheKey = `${userId}-${userRole}`;
  
  if (!cacheInstances.has(cacheKey)) {
    cacheInstances.set(cacheKey, new SecureCache(userId, userRole));
  }
  
  return cacheInstances.get(cacheKey)!;
}
