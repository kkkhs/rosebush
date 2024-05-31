/// <reference types="react" />
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
    wrapper?: boolean;
    children?: React.ReactNode;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
