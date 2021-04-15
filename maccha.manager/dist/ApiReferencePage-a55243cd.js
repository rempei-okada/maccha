function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

import { jsx } from 'react/jsx-runtime';
import { V as axios, m as makeStyles } from './index-ae1e2277.js';
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
