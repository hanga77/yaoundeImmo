import React, { useEffect } from 'react';
import { useData } from '../DataContext';

const SeoManager: React.FC = () => {
  const { seoData } = useData();

  useEffect(() => {
    const { title, description, keywords, ogImage } = seoData;

    const titleTag = document.getElementById('seo-title');
    if (titleTag) {
      titleTag.innerText = title;
    }

    const descriptionTag = document.getElementById('seo-description') as HTMLMetaElement | null;
    if (descriptionTag) {
      descriptionTag.content = description;
    }
    
    const keywordsTag = document.getElementById('seo-keywords') as HTMLMetaElement | null;
    if (keywordsTag) {
      keywordsTag.content = keywords;
    }

    const ogImageTag = document.getElementById('seo-og-image') as HTMLMetaElement | null;
    if (ogImageTag) {
      ogImageTag.content = ogImage;
    }

  }, [seoData]);

  return null; // This component does not render anything
};

export default SeoManager;