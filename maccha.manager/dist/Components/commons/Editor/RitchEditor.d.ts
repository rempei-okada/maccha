/// <reference types="react" />
import "./style.scss";
interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
}
export declare function RitchEditor(props: RitchEditorProps): JSX.Element;
export {};
