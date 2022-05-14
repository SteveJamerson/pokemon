import { IconName } from './Icon.types';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
   name: IconName;
   size?: number;
   className?: string;
}
