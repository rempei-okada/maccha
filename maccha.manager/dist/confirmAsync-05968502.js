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

import { i as __awaiter, j as __generator, k as __assign, u as useTheme, B as Button } from './index-ae1e2277.js';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { s as showDialogAsync, D as DialogContentFrame } from './showDialog-126edd78.js';

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function ConfirmDialog(props) {
    useTheme();
    return (jsx(DialogContentFrame, { actions: jsxs(Fragment, { children: [jsx(Button, __assign({ variant: "text", onClick: function () { return props.onClose(false); } }, { children: props.context.cancelText }), void 0),
                jsx(Button, __assign({ variant: "text", onClick: function () { return props.onClose(true); }, color: "primary" }, { children: props.context.okText }), void 0)] }, void 0), description: props.context.description, message: props.context.message }, void 0));
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
function confirmAsync(message, option) {
    return __awaiter(this, void 0, void 0, function () {
        var merged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    merged = (__assign({ message: message, description: "", okText: "OK", cancelText: "Cancel" }, option));
                    return [4 /*yield*/, showDialogAsync(ConfirmDialog, merged)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

export { confirmAsync as c };
