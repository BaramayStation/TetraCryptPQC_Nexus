
/**
 * TetraCryptPQC useSecureData Hook
 * 
 * A React hook for accessing secured and compartmentalized data
 * with automatic cache optimization and PQC encryption.
 */

import { useState, useEffect, useCallback } from 'react';
import { SecureCompartment, SecurityLevel } from '../lib/secure/compartment';
import { getSecureCache } from '../lib/secure/cache';
import { compressData, decompressData } from '../lib/secure/data-optimization';

interface SecureDataOptions {
  securityLevel?: SecurityLevel;
  cacheTime?: number; // In milliseconds
  initialData?: any;
  userId?: string;
  userRole?: string;
  compartmentId?: string;
}

export function useSecureData<T>(
  dataKey: string,
  options: SecureDataOptions = {}
) {
  const {
    securityLevel = "confidential",
    cacheTime = 300000, // 5 minutes default
    initialData = null,
    userId = "default-user",
    userRole = "user",
    compartmentId = "default-compartment"
  } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Create compartment and cache references
  const [compartment] = useState(
    () => new SecureCompartment<T>(
      compartmentId,
      {
        roles: [userRole],
        userIds: [userId],
        compartmentId,
        securityLevel,
        needToKnow: true
      }
    )
  );
  
  const cache = getSecureCache(userId, userRole);
  
  // Load data from cache or compartment
  const loadData = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First try from cache
      const cachedData = await cache.get<T>(dataKey);
      
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }
      
      // If not in cache, load from compartment
      const storedData = await compartment.get(dataKey);
      
      if (storedData) {
        setData(storedData);
        
        // Store in cache for future use
        await cache.set(dataKey, storedData, {
          ttl: cacheTime,
          securityLevel
        });
      }
    } catch (err) {
      console.error("Error loading secure data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dataKey, compartment, cache, cacheTime, securityLevel, loading]);
  
  // Save data to compartment and cache
  const saveData = useCallback(async (newData: T) => {
    setLoading(true);
    
    try {
      // Save to compartment
      await compartment.set(dataKey, newData);
      
      // Update cache
      await cache.set(dataKey, newData, {
        ttl: cacheTime,
        securityLevel
      });
      
      // Update state
      setData(newData);
    } catch (err) {
      console.error("Error saving secure data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dataKey, compartment, cache, cacheTime, securityLevel]);
  
  // Clear the data
  const clearData = useCallback(async () => {
    setLoading(true);
    
    try {
      // Remove from cache
      await cache.invalidate(dataKey);
      
      // Clear from compartment (set to null)
      await compartment.set(dataKey, null as any);
      
      // Update state
      setData(null);
    } catch (err) {
      console.error("Error clearing secure data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dataKey, compartment, cache]);
  
  // Load data on mount and when key changes
  useEffect(() => {
    loadData();
  }, [dataKey, loadData]);
  
  return {
    data,
    loading,
    error,
    saveData,
    clearData,
    reloadData: loadData,
  };
}
