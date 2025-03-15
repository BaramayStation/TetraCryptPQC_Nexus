
import React, { useEffect } from 'react';

interface SecureHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  charSet?: string;
  viewport?: string;
  children?: React.ReactNode;
}

/**
 * SecureHead component - A secure alternative to react-helmet
 * 
 * This component directly manipulates the document head using the DOM API
 * rather than using runtime script injection like react-helmet.
 * 
 * @param props - Head metadata properties
 * @returns - A React component that updates document head
 */
export const SecureHead: React.FC<SecureHeadProps> = ({ 
  title,
  description,
  keywords,
  robots = 'index, follow',
  ogTitle,
  ogDescription,
  ogImage,
  charSet = 'utf-8',
  viewport = 'width=device-width, initial-scale=1',
  children 
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }
    
    // Helper function to update meta tags
    const updateMeta = (name: string, content?: string) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Helper function to update Open Graph meta tags
    const updateOgMeta = (property: string, content?: string) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', robots);
    updateMeta('charset', charSet);
    updateMeta('viewport', viewport);
    
    // Update Open Graph meta tags
    updateOgMeta('og:title', ogTitle || title);
    updateOgMeta('og:description', ogDescription || description);
    updateOgMeta('og:image', ogImage);
    
    // Clean up function to restore original values on component unmount
    return () => {
      // Cleanup logic if needed
    };
  }, [title, description, keywords, robots, ogTitle, ogDescription, ogImage, charSet, viewport]);
  
  return <>{children}</>;
};
