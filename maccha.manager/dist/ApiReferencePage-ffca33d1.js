import { jsx } from 'react/jsx-runtime';
import { V as axios, m as makeStyles } from './index-ef27c13e.js';
import 'react';
import 'react-dom';

function ApiReferencePage() {
    var classes = useStyles();
    return (jsx("iframe", { className: classes.iframe, src: axios.defaults.baseURL + "api" }, void 0));
}
var useStyles = makeStyles({
    iframe: {
        width: "100%",
        height: "100%",
        border: "none"
    }
});

export default ApiReferencePage;
