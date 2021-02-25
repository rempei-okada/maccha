/// <reference types="react" />
import "react-quill/dist/quill.snow.css";
interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
}
export declare function RitchEditor(props: RitchEditorProps): JSX.Element;
export {};
