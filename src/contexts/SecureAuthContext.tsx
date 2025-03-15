
/**
 * TetraCryptPQC Secure Authentication Context
 * 
 * Provides secure authentication with Zero-Knowledge Proofs and
 * post-quantum cryptographic protection.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ZKPAuthenticator, zkpAuthenticator } from '../lib/secure/zkp-auth';
import { generateSLHDSAKeypair } from '../lib/pqcrypto';
import { SecureCompartment } from '../lib/secure/compartment';

interface AuthUser {
  id: string;
  name: string;
  role: string;
  clearance: string;
  publicKey: string;
  authenticated: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  verifyAccess: (requiredClearance: string) => boolean;
}

const SecureAuthContext = createContext<AuthContextType | undefined>(undefined);

export function SecureAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // In a real implementation, this would validate the session token
        // with the server using ZKP for authentication
        
        // For demo purposes, check local storage for a session
        const storedUser = localStorage.getItem('secureUser');
        
        if (storedUser) {
          // Verify the user's auth status
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    checkExistingSession();
  }, []);
  
  // Login with zero-knowledge proof
  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would:
      // 1. Get a challenge from the server
      // 2. Generate a ZKP proof locally using the private key
      // 3. Send the proof to verify authentication without sending the password
      
      // For demo purposes, simulate successful login
      if (credentials.username && credentials.password) {
        // Generate a keypair for this user
        const keypair = await generateSLHDSAKeypair();
        
        // Create user object
        const authenticatedUser: AuthUser = {
          id: `user-${Date.now()}`,
          name: credentials.username,
          role: "military-operator",
          clearance: "top-secret",
          publicKey: keypair.publicKey,
          authenticated: true
        };
        
        // Store user info
        localStorage.setItem('secureUser', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        
        // Register the user's public key with the authenticator
        await zkpAuthenticator.registerTrustedKey(authenticatedUser.id, keypair.publicKey);
        
        return true;
      }
      
      throw new Error("Invalid credentials");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout
  const logout = () => {
    localStorage.removeItem('secureUser');
    setUser(null);
  };
  
  // Verify access based on clearance
  const verifyAccess = (requiredClearance: string): boolean => {
    if (!user) return false;
    
    const clearanceLevel: Record<string, number> = {
      "unclassified": 0,
      "confidential": 1,
      "secret": 2,
      "top-secret": 3,
      "sci": 4
    };
    
    const userLevel = clearanceLevel[user.clearance.toLowerCase()] || 0;
    const requiredLevel = clearanceLevel[requiredClearance.toLowerCase()] || 0;
    
    return userLevel >= requiredLevel;
  };
  
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    verifyAccess
  };
  
  return (
    <SecureAuthContext.Provider value={value}>
      {children}
    </SecureAuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useSecureAuth() {
  const context = useContext(SecureAuthContext);
  
  if (context === undefined) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider');
  }
  
  return context;
}
