import React from "react";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { RitchEditor } from "../../../commons/Editor";
import { FieldEditorProps } from "./../FieldEditorProps";
import { Editor } from "./Editor";

export const RichEditor: Editor = {
    schemeEditor: () => <></>,
    fieldEditor: Rich,
    type: "rich-editor" as SchemeType,
    name: "リッチエディタ",
    description: "自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。"
};

export function Rich(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    return (
        <RitchEditor
            content={props.field.field.value}
            contentChanged={e => handleChange(e)}
        />
    );
}
