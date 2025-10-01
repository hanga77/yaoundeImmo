import React, { useEffect } from 'react';
import { useData } from '../DataContext';

const ThemeManager: React.FC = () => {
  const { themeData } = useData();

  useEffect(() => {
    if (!themeData || !themeData.primaryButton || !themeData.secondaryButton) return;

    const { primaryButton, secondaryButton } = themeData;

    const css = `
      :root {
        --btn-primary-bg: ${primaryButton.bg};
        --btn-primary-text: ${primaryButton.text};
        --btn-primary-border: ${primaryButton.border};
        --btn-primary-hover-bg: ${primaryButton.hoverBg};
        --btn-primary-hover-text: ${primaryButton.hoverText};
        --btn-primary-hover-border: ${primaryButton.hoverBorder};
        
        --btn-secondary-bg: ${secondaryButton.bg};
        --btn-secondary-text: ${secondaryButton.text};
        --btn-secondary-border: ${secondaryButton.border};
        --btn-secondary-hover-bg: ${secondaryButton.hoverBg};
        --btn-secondary-hover-text: ${secondaryButton.hoverText};
        --btn-secondary-hover-border: ${secondaryButton.hoverBorder};
      }
    `;

    let styleTag = document.getElementById('dynamic-theme-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-theme-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = css;

  }, [themeData]);

  return null;
};

export default ThemeManager;