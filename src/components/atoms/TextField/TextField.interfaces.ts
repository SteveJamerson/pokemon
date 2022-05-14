import { InputHTMLAttributes } from 'react';
import { IconName } from '../Icon/Icon.types';
import { TextFieldTypes, TextFieldVariant } from './TextField.types';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   variant?: TextFieldVariant;
   type?: TextFieldTypes;
   id: string;
   label?: string;
   value?: string | number;
   disabled?: boolean;
   iconName?: IconName;
   iconClick?: any;
   hint?: string;
   error?: string;
}
