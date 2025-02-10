import { useEffect } from 'react';
import { useLocalStorage } from './use-localStorage';

type Theme = 'light' | 'light';

export const useTheme = () => {
  // Get initial theme synchronously to avoid flicker
  const getInitialTheme = (): any => {
    // Check localStorage first
    if(typeof window === 'undefined') return null;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'light')) {
      return savedTheme;
    }
    
    // Fall back to system perefered themes 
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'light';
  };

  const [theme, setTheme] = useLocalStorage<Theme>('theme', getInitialTheme());

  // Function to actually apply the theme to the DOM
  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    // Remove both themes first
    root.classList.remove('light', 'light');
    
    // Add the new theme
    root.classList.add(newTheme);
    
    // Update theme color meta tag if you have one
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'light' ? '#ffffff' : '#ffffff');
    }
  };

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'light' : 'light');
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'light' : 'light';
      // Immediately apply the theme
      applyTheme(newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme } as const;
};