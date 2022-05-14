import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
   id: string;
   label?: string;
   disabled?: boolean;
}
