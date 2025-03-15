
import React, { useEffect } from 'react';

interface SecureHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
}

export const SecureHead: React.FC<SecureHeadProps> = ({
  title,
  description,
  keywords,
  author = 'TetraCryptPQC',
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterSite = '@TetraCryptPQC',
  twitterCreator = '@TetraCryptPQC',
  canonicalUrl,
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Set meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Set meta author
    if (author) {
      let metaAuthor = document.querySelector('meta[name="author"]');
      if (!metaAuthor) {
        metaAuthor = document.createElement('meta');
        metaAuthor.setAttribute('name', 'author');
        document.head.appendChild(metaAuthor);
      }
      metaAuthor.setAttribute('content', author);
    }

    // Set Open Graph tags
    if (ogTitle) {
      let metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (!metaOgTitle) {
        metaOgTitle = document.createElement('meta');
        metaOgTitle.setAttribute('property', 'og:title');
        document.head.appendChild(metaOgTitle);
      }
      metaOgTitle.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let metaOgDescription = document.querySelector('meta[property="og:description"]');
      if (!metaOgDescription) {
        metaOgDescription = document.createElement('meta');
        metaOgDescription.setAttribute('property', 'og:description');
        document.head.appendChild(metaOgDescription);
      }
      metaOgDescription.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta');
        metaOgImage.setAttribute('property', 'og:image');
        document.head.appendChild(metaOgImage);
      }
      metaOgImage.setAttribute('content', ogImage);
    }

    if (ogUrl) {
      let metaOgUrl = document.querySelector('meta[property="og:url"]');
      if (!metaOgUrl) {
        metaOgUrl = document.createElement('meta');
        metaOgUrl.setAttribute('property', 'og:url');
        document.head.appendChild(metaOgUrl);
      }
      metaOgUrl.setAttribute('content', ogUrl);
    }

    // Set Twitter Card tags
    if (twitterCard) {
      let metaTwitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!metaTwitterCard) {
        metaTwitterCard = document.createElement('meta');
        metaTwitterCard.setAttribute('name', 'twitter:card');
        document.head.appendChild(metaTwitterCard);
      }
      metaTwitterCard.setAttribute('content', twitterCard);
    }

    if (twitterSite) {
      let metaTwitterSite = document.querySelector('meta[name="twitter:site"]');
      if (!metaTwitterSite) {
        metaTwitterSite = document.createElement('meta');
        metaTwitterSite.setAttribute('name', 'twitter:site');
        document.head.appendChild(metaTwitterSite);
      }
      metaTwitterSite.setAttribute('content', twitterSite);
    }

    if (twitterCreator) {
      let metaTwitterCreator = document.querySelector('meta[name="twitter:creator"]');
      if (!metaTwitterCreator) {
        metaTwitterCreator = document.createElement('meta');
        metaTwitterCreator.setAttribute('name', 'twitter:creator');
        document.head.appendChild(metaTwitterCreator);
      }
      metaTwitterCreator.setAttribute('content', twitterCreator);
    }

    // Set canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // Cleanup function to restore original title and remove any tags we added
    return () => {
      // We don't need to clean up in this implementation
      // since the tags will be overwritten by the next component
    };
  }, [
    title,
    description,
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    twitterSite,
    twitterCreator,
    canonicalUrl,
  ]);

  return null;
};
