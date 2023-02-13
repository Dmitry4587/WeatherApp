import React from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};
export interface ChangeTheme {
  theme: string;
  handleSetTheme: (theme: string) => void;
}

export const ThemeContext = React.createContext({} as ChangeTheme);
