import { Dispatch, SetStateAction } from 'react';
import { Theme } from './types';

export interface ThemeContextProps {
   theme: Theme;
   setCurrentTheme: Dispatch<SetStateAction<Theme>>;
}
