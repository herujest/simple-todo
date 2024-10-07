import React, {createContext, useState, useContext, ReactNode} from 'react';
import {DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';
import {Dimensions} from 'react-native';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  width: number;
  height: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const {width, height} = Dimensions.get('window');

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === DefaultTheme ? DarkTheme : DefaultTheme,
    );
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, width, height}}>
      {children}
    </ThemeContext.Provider>
  );
};
