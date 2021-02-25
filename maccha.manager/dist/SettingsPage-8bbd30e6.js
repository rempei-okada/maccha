import { i as __awaiter, j as __generator, k as _assign, u as useTheme, R as Box, T as Typography, B as Button, g as __read, s as services, b0 as displayRoles, h as useObserver, aa as RoleType, a8 as Avatar, V as axios, a7 as Icon, S as Select, ah as MenuItem, af as ListItemText } from './index-e5acb89e.js';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { o as observer } from './mobxreact.esm-7409a316.js';
import { b as ColorPalette, a as FileDropArea, F as FlexSpacer } from './ColorPalette-836d6e43.js';
import { s as showDialogAsync } from './showDialog-0ec92b71.js';
import { T as Tabs, a as Tab, S as SwipeableViews } from './index-3bec1e15.js';
import { T as TextField } from './TextField-5a90669f.js';
import { F as Fab } from './Fab-0578cbbb.js';
import 'react-dom';

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function MessageDialog(props) {
    var theme = useTheme();
    return (jsxs(Box, _assign({ p: 2 }, { children: [jsx(Box, { children: jsx(Typography, _assign({ variant: "h6" }, { children: props.context.message }), void 0) }, void 0),
            jsx(Box, _assign({ mt: 1 }, { children: jsx(Typography, _assign({ variant: "overline", style: { color: theme.palette.grey[500] } }, { children: props.context.description }), void 0) }), void 0),
            jsx(Box, _assign({ marginTop: "24px", display: "flex" }, { children: jsx(Button, _assign({ style: { marginLeft: "auto" }, variant: "contained", onClick: function () { return props.onClose(); }, color: "primary" }, { children: props.context.okText }), void 0) }), void 0)] }), void 0));
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
function messageAsync(message, option) {
    return __awaiter(this, void 0, void 0, function () {
        var merged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    merged = (_assign({ message: message, description: "", okText: "OK" }, option));
                    return [4 /*yield*/, showDialogAsync(MessageDialog, merged)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

var UserSettingPanel = observer(function (props) {
    var _a, _b, _c, _d;
    var usersService = services.usersService;
    var _e = __read(useState((_a = localStorage.getItem("color")) !== null && _a !== void 0 ? _a : "8db860"), 2), selectedThemeColor = _e[0], setSelectedThemeColor = _e[1];
    function handleThemeColor(value) {
        setSelectedThemeColor(value);
        localStorage.setItem("color", value);
        window.location.reload();
    }
    return (jsxs(Box, _assign({ p: 2, position: "relative", width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }, { children: [jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "h6" }, { children: "User ID" }), void 0),
                    jsx(Typography, _assign({ variant: "h6" }, { children: (_b = services.usersService.selected) === null || _b === void 0 ? void 0 : _b.userId }), void 0)] }), void 0),
            jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "h6" }, { children: "User Name" }), void 0),
                    jsx(TextField, { style: { marginTop: "12px" }, fullWidth: true, value: (_c = usersService.selected) === null || _c === void 0 ? void 0 : _c.name, onChange: function (e) { return props.onChange("name", e.target.value); } }, void 0)] }), void 0),
            jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "h6" }, { children: "E-Mail" }), void 0),
                    jsx(TextField, { onChange: function (e) { return props.onChange("email", e.target.value); }, style: { marginTop: "12px" }, fullWidth: true, value: (_d = usersService.selected) === null || _d === void 0 ? void 0 : _d.email }, void 0)] }), void 0),
            jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "h6" }, { children: "Role" }), void 0),
                    jsx(Typography, _assign({ variant: "h6" }, { children: usersService.selected ? displayRoles[usersService.selected.role] : "None" }), void 0)] }), void 0),
            jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "h6" }, { children: "Theme Color" }), void 0),
                    jsx(ColorPalette, { colors: [
                            "#e91e63",
                            "#f44336",
                            "#ff5722",
                            "#ff9800",
                            "#ffc107",
                            "#ffeb3b",
                            "#cddc39",
                            "#8db860",
                            "#4caf50",
                            "#009688",
                            "#00bcd4",
                            "#2196f3",
                            "#3f51b5",
                            "#9c27b0",
                        ], onChange: function (c) { return handleThemeColor(c); }, value: selectedThemeColor }, void 0)] }), void 0)] }), void 0));
});

function WebSiteSettingPanel(props) {
    var authService = services.authService, webSiteManagementsService = services.webSiteManagementsService;
    useTheme();
    return useObserver(function () {
        var _a, _b, _c, _d, _e;
        return (jsxs(Box, _assign({ p: 2, position: "relative", width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }, { children: [jsx(Box, { mt: 4 }, void 0),
                jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "subtitle2", color: "textSecondary" }, { children: "Web Site Identifier" }), void 0),
                        jsx(Typography, _assign({ variant: "h6" }, { children: (_a = webSiteManagementsService.selected) === null || _a === void 0 ? void 0 : _a.webSiteId }), void 0)] }), void 0),
                jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "subtitle2", color: "textSecondary" }, { children: "Web Site Name" }), void 0),
                        jsx(Typography, _assign({ variant: "h6" }, { children: (_b = webSiteManagementsService.selected) === null || _b === void 0 ? void 0 : _b.name }), void 0)] }), void 0),
                jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "subtitle2", color: "textSecondary" }, { children: "Web Site Display Name" }), void 0),
                        jsx(TextField, { style: { marginTop: "12px" }, fullWidth: true, disabled: !(authService.loginInfo.role >= RoleType.Edit), value: (_c = webSiteManagementsService.selected) === null || _c === void 0 ? void 0 : _c.displayName, onChange: function (e) { return props.onChange("name", e.target.value); } }, void 0)] }), void 0),
                jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "subtitle2", color: "textSecondary" }, { children: "Host URL" }), void 0),
                        jsx(TextField, { style: { marginTop: "12px" }, fullWidth: true, disabled: !(authService.loginInfo.role >= RoleType.Edit), value: (_d = webSiteManagementsService.selected) === null || _d === void 0 ? void 0 : _d.host, onChange: function (e) { return props.onChange("host", e.target.value); } }, void 0)] }), void 0),
                jsxs(Box, _assign({ width: "100%", mt: 4 }, { children: [jsx(Typography, _assign({ variant: "subtitle2", color: "textSecondary" }, { children: "Web Site Descrtiption" }), void 0),
                        jsx(TextField, { style: { marginTop: "12px" }, fullWidth: true, multiline: true, rows: "6", variant: "filled", disabled: !(authService.loginInfo.role >= RoleType.Edit), value: (_e = webSiteManagementsService.selected) === null || _e === void 0 ? void 0 : _e.description, onChange: function (e) { return props.onChange("description", e.target.value); } }, void 0)] }), void 0)] }), void 0));
    });
}

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function ConfirmDialog(props) {
    var _a = __read(useState(null), 2), file = _a[0], setFile = _a[1];
    return (jsxs(Box, _assign({ p: 2 }, { children: [jsx(Box, { children: jsx(Typography, _assign({ variant: "h6" }, { children: "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), void 0) }, void 0),
            jsx(Box, _assign({ mt: 1 }, { children: jsx(FileDropArea, { onChange: function (e) { return setFile(e); } }, void 0) }), void 0),
            jsxs(Box, _assign({ marginTop: "24px", display: "flex" }, { children: [jsx(Button, _assign({ variant: "text", color: "primary", style: { marginLeft: "auto" }, onClick: function () { return props.onClose(null); } }, { children: "Cancel" }), void 0),
                    jsx(Button, _assign({ disabled: !file, variant: "contained", style: { marginLeft: "12px" }, onClick: function () { return props.onClose(file); }, color: "primary" }, { children: "Ok" }), void 0)] }), void 0)] }), void 0));
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
function showFilePickerAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(ConfirmDialog, undefined)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index;
    return (jsx(Fragment, { children: value === index && (children) }, void 0));
}
var SettingsPage = observer(function () {
    var theme = useTheme();
    var _a = __read(useState(0), 2), selectedTab = _a[0], setSelectedTab = _a[1];
    var usersService = services.usersService, authService = services.authService, webSiteManagementsService = services.webSiteManagementsService;
    var _b = __read(useState(false), 2), isChanged = _b[0], setIsChanged = _b[1];
    useEffect(function () {
        usersService.selectUserAsync(authService.loginInfo.userId);
        webSiteManagementsService.selectWebSiteAsync(authService.loginInfo.identifier);
    }, []);
    function handleChangeWebSiteIdentifier(webSite) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, services.authService.refreshAsync(webSite.webSiteId)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b.sent();
                        console.log("failed to refresh");
                        return [3 /*break*/, 4];
                    case 3:
                        window.location.assign("/settings");
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function handleChangeWebSite(key, value) {
        var _a;
        if (!isChanged) {
            setIsChanged(true);
        }
        var webSite = webSiteManagementsService.selected;
        if (webSite) {
            webSiteManagementsService.setSelectedWebSite(webSite.with((_a = {},
                _a[key] = value,
                _a)));
        }
    }
    function handleChangeUser(key, value) {
        var _a;
        if (!isChanged) {
            setIsChanged(true);
        }
        var user = usersService.selected;
        if (user) {
            usersService.setSelectedUser(user.with((_a = {},
                _a[key] = value,
                _a)));
        }
    }
    function saveAsync() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsChanged(false);
                        return [4 /*yield*/, Promise.all([
                                services.webSiteManagementsService.saveAsync(),
                                services.usersService.saveSelectedUserAsync()
                            ])];
                    case 1:
                        _a.sent();
                        messageAsync("保存しました");
                        return [2 /*return*/];
                }
            });
        });
    }
    function opanPickerAsync() {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showFilePickerAsync()];
                    case 1:
                        file = _a.sent();
                        if (!file) return [3 /*break*/, 4];
                        return [4 /*yield*/, usersService.saveMyAvatarAsync(file)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, services.authService.refreshAsync()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (jsxs(Box, _assign({ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", style: { background: theme.palette.background.default }, flexWrap: "wrap", overflow: "auto" }, { children: [jsxs(Box, _assign({ p: 2, display: "flex", maxWidth: "380px", width: "100%", flexDirection: "column", alignItems: "center", maxHeight: "100%", top: "0px", overflow: "auto", mb: "auto" }, { children: [jsx(Box, { mt: 2 }, void 0),
                    jsxs(Box, _assign({ position: "relative" }, { children: [jsx(Avatar, { src: axios.defaults.baseURL + services.authService.loginInfo.avatar, style: {
                                    width: "180px",
                                    height: "180px"
                                } }, void 0),
                            jsx(Fab, _assign({ style: {
                                    position: "absolute",
                                    bottom: "8px",
                                    right: "8px"
                                }, color: "primary", size: "small", onClick: function () { return opanPickerAsync(); } }, { children: jsx(Icon, { children: "edit" }, void 0) }), void 0)] }), void 0),
                    jsx(Box, { mt: 4 }, void 0),
                    jsx(Typography, _assign({ variant: "h6" }, { children: "Current Identifier " }), void 0),
                    jsx(Select, _assign({ style: { marginTop: "16px", color: theme.palette.text.primary }, variant: "outlined", value: authService.loginInfo.identifier, color: "primary", label: "\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30B5\u30A4\u30C8", fullWidth: true }, { children: webSiteManagementsService.webSites.map(function (w, i) { return (jsx(MenuItem, _assign({ value: w.webSiteId, button: true, onClick: function () { return handleChangeWebSiteIdentifier(w); } }, { children: jsx(ListItemText, { children: w.name }, void 0) }), i)); }) }), void 0),
                    jsx(Box, { mt: 4 }, void 0),
                    jsxs(Tabs, _assign({ indicatorColor: "primary", orientation: "vertical", value: selectedTab, onChange: function (_, e) { return setSelectedTab(e); }, style: { width: "100%" } }, { children: [jsx(Tab, { icon: jsx(Icon, { children: "account_circle" }, void 0), label: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB" }, void 0),
                            jsx(Tab, { icon: jsx(Icon, { children: "view_module" }, void 0), label: "\u30B5\u30A4\u30C8\u7BA1\u7406" }, void 0)] }), void 0)] }), void 0),
            jsx(Box, _assign({ flex: "1 1 auto", overflow: "auto", height: "100%" }, { children: jsxs(SwipeableViews, _assign({ index: selectedTab, axis: "x", style: {
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }, onChangeIndex: function (_, e) { return setSelectedTab(e); } }, { children: [jsxs(TabPanel, _assign({ value: selectedTab, index: 0 }, { children: [jsxs(Box, _assign({ mt: 4, p: 2, display: "flex" }, { children: [jsx(Typography, _assign({ variant: "h4" }, { children: "Profile Settings" }), void 0),
                                        jsx(FlexSpacer, {}, void 0),
                                        jsxs(Button, _assign({ disabled: !isChanged, color: "primary", variant: "contained", onClick: function (_) { return saveAsync(); } }, { children: [jsx(Icon, _assign({ style: { marginRight: "4px" } }, { children: "save" }), void 0), "\u4FDD\u5B58"] }), void 0)] }), void 0),
                                jsx(UserSettingPanel, { onChange: function (k, v) { return handleChangeUser(k, v); } }, void 0)] }), void 0),
                        jsxs(TabPanel, _assign({ value: selectedTab, index: 1 }, { children: [jsxs(Box, _assign({ mt: 4, display: "flex", width: "600px" }, { children: [jsx(Typography, _assign({ variant: "h4" }, { children: "Web Site Settings" }), void 0),
                                        jsx(FlexSpacer, {}, void 0),
                                        jsxs(Button, _assign({ disabled: !isChanged, color: "primary", variant: "contained", onClick: function (_) { return saveAsync(); } }, { children: [jsx(Icon, _assign({ style: { marginRight: "4px" } }, { children: "save" }), void 0), "\u4FDD\u5B58"] }), void 0)] }), void 0),
                                jsx(WebSiteSettingPanel, { onChange: function (k, v) { return handleChangeWebSite(k, v); } }, void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0));
});

export default SettingsPage;
