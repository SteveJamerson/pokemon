import { ReactComponent as ArrowDownLine } from './svg/arrow-down-line.svg';
import { ReactComponent as ArrowLeftLine } from './svg/arrow-left-line.svg';
import { ReactComponent as ArrowRightLine } from './svg/arrow-right-line.svg';
import { ReactComponent as ArrowUpLine } from './svg/arrow-up-line.svg';
import { ReactComponent as CloseFill } from './svg/close-fill.svg';
import { ReactComponent as EyeCloseLine } from './svg/eye-close-line.svg';
import { ReactComponent as EyeLine } from './svg/eye-line.svg';
import { ReactComponent as FemaleFill } from './svg/female-fill.svg';
import { ReactComponent as HeartFill } from './svg/heart-fill.svg';
import { ReactComponent as HeartLine } from './svg/heart-line.svg';
import { ReactComponent as LoaderLine } from './svg/loader-line.svg';
import { ReactComponent as MaleFill } from './svg/male-fill.svg';
import { ReactComponent as SearchLine } from './svg/search-line.svg';

const IconsTypes = {
   'arrow-down-line': ArrowDownLine,
   'arrow-left-line': ArrowLeftLine,
   'arrow-right-line': ArrowRightLine,
   'arrow-up-line': ArrowUpLine,
   'close-fill': CloseFill,
   'eye-line': EyeLine,
   'female-fill': FemaleFill,
   'heart-fill': HeartFill,
   'heart-line': HeartLine,
   'eye-close-line': EyeCloseLine,
   'loader-line': LoaderLine,
   'male-fill': MaleFill,
   'search-line': SearchLine,
};

export default IconsTypes;

export type IconName =
   | 'arrow-down-line'
   | 'arrow-left-line'
   | 'arrow-right-line'
   | 'arrow-up-line'
   | 'close-fill'
   | 'eye-line'
   | 'eye-close-line'
   | 'female-fill'
   | 'heart-fill'
   | 'heart-line'
   | 'loader-line'
   | 'male-fill'
   | 'search-line';
