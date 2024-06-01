/// <reference types="react" />
interface DraggerProps {
    onFile: (files: FileList) => void;
    children?: React.ReactNode;
}
export declare const Dragger: ({ onFile, children }: DraggerProps) => import("react/jsx-runtime").JSX.Element;
export default Dragger;
