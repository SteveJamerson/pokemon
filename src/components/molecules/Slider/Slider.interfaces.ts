import { HTMLAttributes } from 'react';

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
   mouseEvent?: boolean;
   touchEvent?: boolean;
   navigation?: boolean;
   index?: number;
}
