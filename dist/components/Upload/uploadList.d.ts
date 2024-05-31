/// <reference types="react" />
import { UploadFile } from './upload';
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
export declare const UploadList: ({ fileList, onRemove }: UploadListProps) => import("react").JSX.Element;
export default UploadList;
