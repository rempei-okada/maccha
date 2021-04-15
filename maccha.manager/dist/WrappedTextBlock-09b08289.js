import { createElement } from 'react';
import { b as createSvgIcon, T as Typography, k as __assign } from './index-ef27c13e.js';
import { jsx } from 'react/jsx-runtime';

var FileCopy = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"
}), 'FileCopy');

function WrappedTextBlock(props) {
    var _a;
    return (jsx(Typography, __assign({ style: {
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: props.row,
            overflow: "hidden",
            wordBreak: "break-all",
            fontSize: (_a = props.fontSize) !== null && _a !== void 0 ? _a : undefined
        } }, props, { children: props.children }), void 0));
}

export { FileCopy as F, WrappedTextBlock as W };
