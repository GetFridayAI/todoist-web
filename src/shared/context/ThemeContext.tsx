import React, { createContext, useContext } from 'react';
import { APP_THEMES } from '../interfaces/app.interface';
import appStyles from '../styles/app.styles';

type ThemeStyles = {
  backgroundColor: string;
  color: string;
};

interface ThemeContextValue {
  theme: APP_THEMES;
  styles: ThemeStyles;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  theme: APP_THEMES;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const resolvedTheme = theme === APP_THEMES.SYSTEM ? APP_THEMES.LIGHT : theme;
  const styles = appStyles[resolvedTheme] as ThemeStyles;

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
