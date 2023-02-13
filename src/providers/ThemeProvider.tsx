import React from 'react';
import { ThemeContext, themes } from '../contexts/ThemeContext';

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) return theme;
  return themes.dark;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState(getTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSetTheme = React.useCallback((theme: string) => setTheme(theme), []);

  const value = React.useMemo(() => ({ theme, handleSetTheme }), [theme, handleSetTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
