import React from "react";
import { SchemeType } from "../../../../Models/Contents/Entities/Scheme";
import { FieldEditorProps } from "./../FieldEditorProps";
import { Editor } from "./Editor";

export const ImageEditor: Editor = {
    fieldEditor: Image,
    schemeEditor: () => <></>,
    type: "image" as SchemeType,
    name: "画像",
    description: "画像用のフィールドです。APIからは画像URLが返却されます。"
};

function Image(props: FieldEditorProps) {
    function handleChange(text: string) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }

    return (
        <img
            src={props.field.field.value}
        />
    );
}