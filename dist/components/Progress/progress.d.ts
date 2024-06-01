/// <reference types="react" />
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    percent?: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: ({ percent, strokeHeight, showText, styles, theme, }: ProgressProps) => import("react/jsx-runtime").JSX.Element;
export default Progress;
