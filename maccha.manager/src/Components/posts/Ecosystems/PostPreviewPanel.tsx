import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import {
    Tabs, Tab, Divider,
    Icon,
    TextField, Box, Typography, Button, Backdrop, makeStyles
} from "@material-ui/core";
import { Post } from "../../../Models/posts/entities/Post";
import SwipeableViews from "react-swipeable-views";
import { services } from "../../../Services";
import { Observer, useObserver } from "mobx-react";
import { PhotoGridView } from "../../commons";
import { Flipped, Flipper } from "react-flip-toolkit";
import "../Environments/style.scss";
import { Field } from "../../../Models/Contents/Entities/Field";
import { Scheme } from "../../../Models/Contents/Entities/Scheme";
import { SchemeEditorProps } from "../FieldEditors/SchemeEditorProps";

export function PostPreviewPanel() {
    const { postEditService, postManagementsService } = services;

    return <Observer>
        {
            () => {
                const content = postEditService.content;
                const schemes = postManagementsService.selected?.taxonomy?.schemes
                    .reduce(
                        (x, y) => ({ ...x, [y.schemeId]: y }),
                        {} as { [key: string]: Scheme }
                    ) ?? {};

                return content && (
                    <Box
                        position="relative"
                        className="post"
                        maxWidth="100%" width="780px"
                    >
                        <Box
                            mt={3}
                            display="flex" mx="auto"
                            flexDirection="column"
                            alignItems="center"
                            px={3}
                            mb={20}
                            width="100%"
                        >
                            <Typography color="textSecondary">{(content.publishIn ?? content.createdAt).toFormat("y.M.d")}</Typography>
                            <Typography variant="h1" style={{ marginTop: "16px" }}>{content.title}</Typography>

                            <Box mt={3} width="100%">
                                <img
                                    alt={content.title}
                                    src={content.thumbnail}
                                    style={{
                                        width: "100%",
                                        objectFit: "cover",
                                        maxHeight: "480px"
                                    }}
                                />
                            </Box>

                            {
                                content.fields.map(f => (
                                    <Box mt={3} key={f.fieldId} width="100%">
                                        <FieldRenderer scheme={schemes[f.schemeId]} field={f} />
                                    </Box>
                                ))
                            }

                        </Box>
                    </Box >
                );
            }
        }
    </Observer>;
}

function FieldRenderer(props: { field: Field, scheme: Scheme }) {
    if (props.scheme.type === "photo-gallery") {
        return (
            <>
                <Typography variant="h4" style={{ marginTop: "16px" }}>{props.scheme.displayName}</Typography>
                <PhotoGalleryPreview images={props.field.value.split(",").filter(x => !!x)} />
            </>
        );
    }

    return (
        <>
            <Typography variant="h4" style={{ marginTop: "16px" }}>{props.scheme.displayName}</Typography>
            <div style={{ width: "100%", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: props.field.value }}></div>
        </>
    );
}

function PhotoGalleryPreview(props: { images: string[] }) {
    const classes = useStyle();
    const [path, setPath] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    return <>
        <Box my={2} display="flex" flexWrap="wrap" width="100%">
            <Flipper flipKey={selected}>
                <PhotoGridView
                    images={props.images}
                    disableSelection
                    invoked={path => {
                        setSelected(path);
                        setPath(path);
                    }}
                />

                <Backdrop style={{ zIndex: 9999 }} open={!!selected} onClick={() => setSelected(null)}>
                </Backdrop>

                {
                    selected &&
                    <Flipped flipId={selected ?? ""}>
                        <div
                            onClick={() => setSelected(null)}
                            style={{
                                zIndex: 99999,
                                height: "80%",
                                width: "80%",
                                position: "fixed",
                                top: "0",
                                left: "0",
                                right: "0",
                                bottom: "0",
                                margin: "auto"
                            }}
                        >
                            <img
                                src={path}
                                alt={path}
                                className={classes.img}
                            />
                        </div>
                    </Flipped>
                }

            </Flipper>
        </Box>
    </>;
}

const useStyle = makeStyles({
    imgContainer: {
        height: "160px",
    },
    img: {
        height: "100%",
        width: "100%",
        objectFit: "contain"
    }
});