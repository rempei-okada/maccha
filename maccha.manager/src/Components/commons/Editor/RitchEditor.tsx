import React from "react";
import "./style.scss";

import ReactQuill from "react-quill";

interface RitchEditorProps {
    content: string;
    contentChanged: (e: string) => void;
}

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],        // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],               // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],      // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }],          // outdent/indent
    [{ direction: "rtl" }],                         // text direction

    [{ size: ["small", false, "large", "huge"] }],  // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"]                                         // remove formatting button
];

export function RitchEditor(props: RitchEditorProps) {
    return (
        <ReactQuill value={props.content}
            theme="snow"
            modules={{
                toolbar: toolbarOptions,
            }}
            onChange={e => props.contentChanged(e)}
        />
    );
}