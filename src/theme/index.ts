import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#FAB232',
      500: '#FCBF4A',
      300: '#FCBF4A',
    },
    blue: {
      800: '#002F49',
      700: '#141D54',
      500: '#2C3A96',
      300: '#3144B5',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    input: {
      bg: '#F5F6F7',
      label: '#969AAF',
    },
    title: '#f5f5f4',
    subtitle: '#d6d3d1',
    body: '#d6d3d1',
    link: '#5182B7',
    red: {
      300: '#FF5E63',
      500: '#F75A68',
      700: '#DF3261',
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});
