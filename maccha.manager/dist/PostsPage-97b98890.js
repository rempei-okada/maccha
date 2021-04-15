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

import { A as useForkRef, C as useEventCallback, D as ownerDocument, E as elementAcceptingRef, p as propTypes, G as exactProp, _ as _objectWithoutProperties, J as useControlled, K as _slicedToArray, L as _toConsumableArray, a as _extends, b as createSvgIcon, w as withStyles, M as fade, u as useTheme, c as clsx, e as capitalize, N as ButtonBase, T as Typography, k as __assign, P as Paper, Q as InputBase, I as IconButton, f as useHistory, R as Box, U as Divider, V as axios, W as List, X as schemeTypeDisplayNames, Y as _objectWithoutPropertiesLoose, m as makeStyles, g as __read, Z as Icon, $ as Avatar, s as services, a0 as theme, a1 as RoleType, a2 as useLocation, i as __awaiter, j as __generator, B as Button, a3 as useRouteMatch, a4 as ObserverComponent, a5 as ListItem, a6 as ListItemText, a7 as Menu, a8 as MenuItem, a9 as Slide } from './index-ae1e2277.js';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
import React, { useRef, useEffect, useCallback, createElement, Fragment, cloneElement, forwardRef, useMemo, useState, useImperativeHandle, Children } from 'react';
import { F as FlexSpacer, I as ItemsWrapGrid } from './ColorPalette-03e2eede.js';
import { C as Checkbox, s as showDialogAsync } from './showDialog-126edd78.js';
import { F as FileCopy, W as WrappedTextBlock } from './WrappedTextBlock-f6375693.js';
import { o as observer } from './mobxreact.esm-357b5daf.js';
import { findDOMNode } from 'react-dom';
import { F as Fab } from './Fab-ec17eead.js';
import { p as postStatusTypeDisplay } from './PostStatusType-ec0d1875.js';
import { C as Card } from './Card-f1b9a309.js';
import { S as Search, T as TableContainer, a as Table, b as TableHead, c as TableRow, d as TableCell, e as TableBody } from './Search-b5c6acad.js';
import { c as confirmAsync } from './confirmAsync-05968502.js';
import { A as Add } from './Add-8e1b8549.js';

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event) {
  return document.documentElement.clientWidth < event.clientX || document.documentElement.clientHeight < event.clientY;
}
/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */


function ClickAwayListener(props) {
  var children = props.children,
      _props$disableReactTr = props.disableReactTree,
      disableReactTree = _props$disableReactTr === void 0 ? false : _props$disableReactTr,
      _props$mouseEvent = props.mouseEvent,
      mouseEvent = _props$mouseEvent === void 0 ? 'onClick' : _props$mouseEvent,
      onClickAway = props.onClickAway,
      _props$touchEvent = props.touchEvent,
      touchEvent = _props$touchEvent === void 0 ? 'onTouchEnd' : _props$touchEvent;
  var movedRef = useRef(false);
  var nodeRef = useRef(null);
  var activatedRef = useRef(false);
  var syntheticEventRef = useRef(false);
  useEffect(function () {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(function () {
      activatedRef.current = true;
    }, 0);
    return function () {
      activatedRef.current = false;
    };
  }, []); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = useCallback(function (instance) {
    // #StrictMode ready
    nodeRef.current = findDOMNode(instance);
  }, []);
  var handleRef = useForkRef(children.ref, handleOwnRef); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviours like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  var handleClickAway = useEventCallback(function (event) {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false; // 1. IE 11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!activatedRef.current || !nodeRef.current || clickedRootScrollbar(event)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
      var doc = ownerDocument(nodeRef.current);
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var createHandleSynthetic = function createHandleSynthetic(handlerName) {
    return function (event) {
      syntheticEventRef.current = true;
      var childrenPropsHandler = children.props[handlerName];

      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };
  };

  var childrenProps = {
    ref: handleRef
  };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  useEffect(function () {
    if (touchEvent !== false) {
      var mappedTouchEvent = mapEventPropToEvent(touchEvent);
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return function () {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  useEffect(function () {
    if (mouseEvent !== false) {
      var mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return function () {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/cloneElement(children, childrenProps));
}

process.env.NODE_ENV !== "production" ? ClickAwayListener.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree: propTypes.bool,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: propTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),

  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: propTypes.func.isRequired,

  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: propTypes.oneOf(['onTouchEnd', 'onTouchStart', false])
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  ClickAwayListener['propTypes' + ''] = exactProp(ClickAwayListener.propTypes);
}

function usePagination() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // keep default values in sync with @default tags in Pagination.propTypes

  var _props$boundaryCount = props.boundaryCount,
      boundaryCount = _props$boundaryCount === void 0 ? 1 : _props$boundaryCount,
      _props$componentName = props.componentName,
      componentName = _props$componentName === void 0 ? 'usePagination' : _props$componentName,
      _props$count = props.count,
      count = _props$count === void 0 ? 1 : _props$count,
      _props$defaultPage = props.defaultPage,
      defaultPage = _props$defaultPage === void 0 ? 1 : _props$defaultPage,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$hideNextButton = props.hideNextButton,
      hideNextButton = _props$hideNextButton === void 0 ? false : _props$hideNextButton,
      _props$hidePrevButton = props.hidePrevButton,
      hidePrevButton = _props$hidePrevButton === void 0 ? false : _props$hidePrevButton,
      handleChange = props.onChange,
      pageProp = props.page,
      _props$showFirstButto = props.showFirstButton,
      showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
      _props$showLastButton = props.showLastButton,
      showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
      _props$siblingCount = props.siblingCount,
      siblingCount = _props$siblingCount === void 0 ? 1 : _props$siblingCount,
      other = _objectWithoutProperties(props, ["boundaryCount", "componentName", "count", "defaultPage", "disabled", "hideNextButton", "hidePrevButton", "onChange", "page", "showFirstButton", "showLastButton", "siblingCount"]);

  var _useControlled = useControlled({
    controlled: pageProp,
    default: defaultPage,
    name: componentName,
    state: 'page'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      page = _useControlled2[0],
      setPageState = _useControlled2[1];

  var handleClick = function handleClick(event, value) {
    if (!pageProp) {
      setPageState(value);
    }

    if (handleChange) {
      handleChange(event, value);
    }
  }; // https://dev.to/namirsab/comment/2050


  var range = function range(start, end) {
    var length = end - start + 1;
    return Array.from({
      length: length
    }, function (_, i) {
      return start + i;
    });
  };

  var startPages = range(1, Math.min(boundaryCount, count));
  var endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  var siblingsStart = Math.max(Math.min( // Natural start
  page - siblingCount, // Lower boundary when page is high
  count - boundaryCount - siblingCount * 2 - 1), // Greater than startPages
  boundaryCount + 2);
  var siblingsEnd = Math.min(Math.max( // Natural end
  page + siblingCount, // Upper boundary when page is low
  boundaryCount + siblingCount * 2 + 2), // Less than endPages
  endPages[0] - 2); // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']

  var itemList = [].concat(_toConsumableArray(showFirstButton ? ['first'] : []), _toConsumableArray(hidePrevButton ? [] : ['previous']), _toConsumableArray(startPages), _toConsumableArray(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []), _toConsumableArray(range(siblingsStart, siblingsEnd)), _toConsumableArray(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []), _toConsumableArray(endPages), _toConsumableArray(hideNextButton ? [] : ['next']), _toConsumableArray(showLastButton ? ['last'] : [])); // Map the button type to its page number

  var buttonPage = function buttonPage(type) {
    switch (type) {
      case 'first':
        return 1;

      case 'previous':
        return page - 1;

      case 'next':
        return page + 1;

      case 'last':
        return count;

      default:
        return null;
    }
  }; // Convert the basic item list to PaginationItem props objects


  var items = itemList.map(function (item) {
    return typeof item === 'number' ? {
      onClick: function onClick(event) {
        handleClick(event, item);
      },
      type: 'page',
      page: item,
      selected: item === page,
      disabled: disabled,
      'aria-current': item === page ? 'true' : undefined
    } : {
      onClick: function onClick(event) {
        handleClick(event, buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled: disabled || item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)
    };
  });
  return _extends({
    items: items
  }, other);
}

/**
 * @ignore - internal component.
 */

var FirstPageIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
}), 'FirstPage');

/**
 * @ignore - internal component.
 */

var LastPageIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
}), 'LastPage');

/**
 * @ignore - internal component.
 */

var NavigateBeforeIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), 'NavigateBefore');

/**
 * @ignore - internal component.
 */

var NavigateNextIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'NavigateNext');

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      borderRadius: 32 / 2,
      textAlign: 'center',
      boxSizing: 'border-box',
      minWidth: 32,
      height: 32,
      padding: '0 6px',
      margin: '0 3px',
      color: theme.palette.text.primary
    }),

    /* Styles applied to the root element if `type="page"`. */
    page: {
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.action.focus
      },
      '&$selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.action.selected
          }
        },
        '&$disabled': {
          opacity: 1,
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected
        }
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Styles applied applied to the root element if `size="small"`. */
    sizeSmall: {
      minWidth: 26,
      height: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
      '& $icon': {
        fontSize: theme.typography.pxToRem(18)
      }
    },

    /* Styles applied applied to the root element if `size="large"`. */
    sizeLarge: {
      minWidth: 40,
      height: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
      '& $icon': {
        fontSize: theme.typography.pxToRem(22)
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
    textPrimary: {
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.primary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.primary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
    textSecondary: {
      '&$selected': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.secondary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.secondary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `outlined="true"`. */
    outlined: {
      border: "1px solid ".concat(theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'),
      '&$selected': {
        '&$disabled': {
          border: "1px solid ".concat(theme.palette.action.disabledBackground)
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      '&$selected': {
        color: theme.palette.primary.main,
        border: "1px solid ".concat(fade(theme.palette.primary.main, 0.5)),
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      '&$selected': {
        color: theme.palette.secondary.main,
        border: "1px solid ".concat(fade(theme.palette.secondary.main, 0.5)),
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `rounded="true"`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
    ellipsis: {
      height: 'auto',
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the icon element. */
    icon: {
      fontSize: theme.typography.pxToRem(20),
      margin: '0 -8px'
    }
  };
};
var PaginationItem = /*#__PURE__*/forwardRef(function PaginationItem(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      component = props.component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      page = props.page,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$type = props.type,
      type = _props$type === void 0 ? 'page' : _props$type,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["classes", "className", "color", "component", "disabled", "page", "selected", "shape", "size", "type", "variant"]);

  var theme = useTheme();
  var normalizedIcons = theme.direction === 'rtl' ? {
    previous: NavigateNextIcon,
    next: NavigateBeforeIcon,
    last: FirstPageIcon,
    first: LastPageIcon
  } : {
    previous: NavigateBeforeIcon,
    next: NavigateNextIcon,
    first: FirstPageIcon,
    last: LastPageIcon
  };
  var Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/createElement("div", {
    ref: ref,
    className: clsx(classes.root, classes.ellipsis, disabled && classes.disabled, size !== 'medium' && classes["size".concat(capitalize(size))])
  }, "\u2026") : /*#__PURE__*/createElement(ButtonBase, _extends({
    ref: ref,
    component: component,
    disabled: disabled,
    focusVisibleClassName: classes.focusVisible,
    className: clsx(classes.root, classes.page, classes[variant], classes[shape], className, color !== 'standard' && classes["".concat(variant).concat(capitalize(color))], disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(capitalize(size))])
  }, other), type === 'page' && page, Icon ? /*#__PURE__*/createElement(Icon, {
    className: classes.icon
  }) : null);
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes = {
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * The active color.
   */
  color: propTypes.oneOf(['standard', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the item will be disabled.
   */
  disabled: propTypes.bool,

  /**
   * The current page number.
   */
  page: propTypes.number,

  /**
   * If `true` the pagination item is selected.
   */
  selected: propTypes.bool,

  /**
   * The shape of the pagination item.
   */
  shape: propTypes.oneOf(['round', 'rounded']),

  /**
   * The size of the pagination item.
   */
  size: propTypes.oneOf(['small', 'medium', 'large']),

  /**
   * The type of pagination item.
   */
  type: propTypes.oneOf(['page', 'first', 'last', 'next', 'previous', 'start-ellipsis', 'end-ellipsis']),

  /**
   * The pagination item variant.
   */
  variant: propTypes.oneOf(['text', 'outlined'])
} : void 0;
var PaginationItem$1 = withStyles(styles, {
  name: 'MuiPaginationItem'
})(PaginationItem);

var styles$1 = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return "".concat(selected ? '' : 'Go to ', "page ").concat(page);
  }

  return "Go to ".concat(type, " page");
}

var Pagination = /*#__PURE__*/forwardRef(function Pagination(props, ref) {
  props.boundaryCount;
      var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color;
      props.count;
      props.defaultPage;
      props.disabled;
      var _props$getItemAriaLab = props.getItemAriaLabel,
      getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab;
      props.hideNextButton;
      props.hidePrevButton;
      props.onChange;
      props.page;
      var _props$renderItem = props.renderItem,
      renderItem = _props$renderItem === void 0 ? function (item) {
    return /*#__PURE__*/createElement(PaginationItem$1, item);
  } : _props$renderItem,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape;
      props.showFirstButton;
      props.showLastButton;
      props.siblingCount;
      var _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["boundaryCount", "classes", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);

  var _usePagination = usePagination(_extends({}, props, {
    componentName: 'Pagination'
  })),
      items = _usePagination.items;

  return /*#__PURE__*/createElement("nav", _extends({
    "aria-label": "pagination navigation",
    className: clsx(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/createElement("ul", {
    className: classes.ul
  }, items.map(function (item, index) {
    return /*#__PURE__*/createElement("li", {
      key: index
    }, renderItem(_extends({}, item, {
      color: color,
      'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
      shape: shape,
      size: size,
      variant: variant
    })));
  })));
}); // @default tags synced with default values from usePagination

process.env.NODE_ENV !== "production" ? Pagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: propTypes.number,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * The active color.
   */
  color: propTypes.oneOf(['primary', 'secondary', 'standard']),

  /**
   * The total number of pages.
   * @default 1
   */
  count: propTypes.number,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: propTypes.number,

  /**
   * If `true`, the pagination component will be disabled.
   * @default false
   */
  disabled: propTypes.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: propTypes.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: propTypes.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: propTypes.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: propTypes.func,

  /**
   * The current page.
   */
  page: propTypes.number,

  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   */
  renderItem: propTypes.func,

  /**
   * The shape of the pagination items.
   */
  shape: propTypes.oneOf(['round', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: propTypes.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: propTypes.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: propTypes.number,

  /**
   * The size of the pagination component.
   */
  size: propTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   */
  variant: propTypes.oneOf(['outlined', 'text'])
} : void 0;
var Pagination$1 = withStyles(styles$1, {
  name: 'MuiPagination'
})(Pagination);

var EditIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), 'Edit');

var MoreVert = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), 'MoreVert');

function DateTimeText(props) {
    var _a;
    var date = props.date, showTime = props.showTime;
    return (jsxs(Typography, __assign({}, props, { style: { fontSize: props.fontSize } }, { children: [date === null || date === void 0 ? void 0 : date.getFullYear(),
            jsx("small", { children: " \u5E74" }, void 0),
            ((_a = date === null || date === void 0 ? void 0 : date.getMonth()) !== null && _a !== void 0 ? _a : 0) + 1,
            jsx("small", { children: "\u6708" }, void 0),
            date === null || date === void 0 ? void 0 : date.getDate(),
            jsx("small", { children: "\u65E5" }, void 0),
            showTime && (jsxs(Fragment$1, { children: [date === null || date === void 0 ? void 0 : date.getHours(),
                    jsx("small", { children: "\u6642" }, void 0),
                    date === null || date === void 0 ? void 0 : date.getMinutes(),
                    jsx("small", { children: "\u5206" }, void 0)] }, void 0))] }), void 0));
}

function SearchBox(props) {
    var _a;
    return (jsxs(Paper, __assign({ elevation: (_a = props.elevation) !== null && _a !== void 0 ? _a : 2, style: __assign(__assign({}, props.style), { display: "flex" }) }, { children: [jsx(InputBase, { onChange: function (e) { var _a; return props.changed && props.changed((_a = e.target.value) !== null && _a !== void 0 ? _a : ""); }, value: props.value, style: {
                    marginLeft: "8px",
                    flex: "1 1 auto",
                }, placeholder: props.placeholder }, void 0),
            jsx(IconButton, __assign({ type: "submit", style: { padding: "8px" }, "aria-label": "search", onClick: function () { return props.invoked && props.invoked(); } }, { children: jsx(Search, {}, void 0) }), void 0)] }), void 0));
}

function PostTypeSettingPanel(props) {
    var postType = props.postType;
    var history = useHistory();
    function handleEdit() {
        history.push("/posts/" + postType.taxonomy.name + "/edit");
    }
    function copyToClipBoard(text) {
        var _a;
        (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(text);
    }
    return (jsxs(Box, __assign({ p: 2 }, { children: [jsxs(Box, __assign({ display: "flex", width: "100%", alignItems: "center" }, { children: [jsx(Typography, __assign({ variant: "h6" }, { children: "\u6295\u7A3F\u8A2D\u5B9A" }), void 0),
                    jsx(Box, { flex: "1 1 auto" }, void 0),
                    jsx(IconButton, __assign({ color: "primary", onClick: handleEdit }, { children: jsx(EditIcon, {}, void 0) }), void 0)] }), void 0),
            jsx(Divider, {}, void 0),
            jsxs(Box, __assign({ mt: 1 }, { children: [jsxs(Box, __assign({ display: "flex" }, { children: [jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8" }), void 0),
                            jsx(FlexSpacer, {}, void 0),
                            jsx(IconButton, __assign({ color: "primary", size: "small", onClick: function (_) { return copyToClipBoard(axios.defaults.baseURL + "contents/" + props.postType.taxonomy.name); } }, { children: jsx(FileCopy, { fontSize: "small" }, void 0) }), void 0)] }), void 0),
                    jsxs(Typography, __assign({ style: { wordBreak: "break-all" } }, { children: [axios.defaults.baseURL, "contents/", props.postType.taxonomy.name] }), void 0)] }), void 0),
            jsxs(Box, __assign({ mt: 1 }, { children: [jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u540D\u79F0" }), void 0),
                    jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.name }), void 0)] }), void 0),
            jsxs(Box, __assign({ mt: 1 }, { children: [jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u8868\u793A\u540D" }), void 0),
                    jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.displayName }), void 0)] }), void 0),
            jsxs(Box, __assign({ mt: 1 }, { children: [jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u5099\u8003" }), void 0),
                    jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.description }), void 0)] }), void 0),
            jsxs(Box, __assign({ mt: 1 }, { children: [jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u30B9\u30AD\u30FC\u30E0" }), void 0),
                    jsx(Divider, {}, void 0),
                    postType.taxonomy.schemes.length ?
                        jsx(List, { children: postType.taxonomy.schemes.map(function (s) {
                                var _a;
                                return (jsxs(Box, __assign({ mb: 1 }, { children: [jsx(Box, { children: jsx(Typography, __assign({ variant: "body2", style: { fontSize: "12px" }, color: "textSecondary", noWrap: true }, { children: s.name ? s.name : "　" }), void 0) }, void 0),
                                        jsx(Box, { children: jsx(Typography, __assign({ variant: "body2", style: { fontSize: "12px" }, color: "textSecondary", noWrap: true }, { children: s.displayName ? s.displayName : "　" }), void 0) }, void 0),
                                        jsx(Box, { children: jsx(Typography, __assign({ color: "primary", variant: "subtitle2", noWrap: true }, { children: (_a = schemeTypeDisplayNames[s.type]) !== null && _a !== void 0 ? _a : "　" }), void 0) }, void 0),
                                        jsx(Box, { children: jsx(Typography, __assign({ style: { fontSize: "11px" }, variant: "caption", color: "textSecondary" }, { children: s.description }), void 0) }, void 0),
                                        jsx(Box, { mt: 1 }, void 0),
                                        jsx(Divider, {}, void 0)] }), void 0));
                            }) }, void 0)
                        :
                            jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: "\u30B9\u30AD\u30FC\u30E0\u304C\u3042\u308A\u307E\u305B\u3093" }), void 0)] }), void 0)] }), void 0));
}

// refs, but then host hooks / components could not opt out of renders.
// This could've been exported to its own module, but the current build doesn't
// seem to work with module imports and I had no more time to spend on this...

function useResolvedElement(subscriber, refOrElement) {
  var _ref; // The default ref has to be non-conditionally declared here whether or not
  // it'll be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation


  var ref = null; // Default ref

  var refElement = useRef(null);
  var callbackRefElement = useRef(null);
  var refCallback = useCallback(function (element) {
    callbackRefElement.current = element;
    callSubscriber();
  }, []);
  var lastReportedElementRef = useRef(null);
  var cleanupRef = useRef();

  var callSubscriber = function callSubscriber() {
    var element = null;

    if (callbackRefElement.current) {
      element = callbackRefElement.current;
    } else if (refElement.current) {
      element = refElement.current;
    } else if (refOrElement instanceof HTMLElement) {
      element = refOrElement;
    }

    if (lastReportedElementRef.current === element) {
      return;
    }

    if (cleanupRef.current) {
      cleanupRef.current(); // Making sure the cleanup is not called accidentally multiple times.

      cleanupRef.current = null;
    }

    lastReportedElementRef.current = element; // Only calling the subscriber, if there's an actual element to report.

    if (element) {
      cleanupRef.current = subscriber(element);
    }
  };

  if (refOrElement && !(refOrElement instanceof HTMLElement)) {
    // Overriding the default ref with the given one
    ref = refOrElement;
  } // On each render, we check whether a ref changed, or if we got a new raw
  // element.


  useEffect(function () {
    // Note that this does not mean that "element" will necessarily be whatever
    // the ref currently holds. It'll simply "update" `element` each render to
    // the current ref value, but there's no guarantee that the ref value will
    // not change later without a render.
    // This may or may not be a problem depending on the specific use case.
    if (ref) {
      refElement.current = ref.current;
    }

    callSubscriber();
  }, [ref, (_ref = ref) == null ? void 0 : _ref.current, refOrElement]);
  return refCallback;
}

function useResizeObserver(opts) {
  if (opts === void 0) {
    opts = {};
  } // Saving the callback as a ref. With this, I don't need to put onResize in the
  // effect dep array, and just passing in an anonymous function without memoising
  // will not reinstantiate the hook's ResizeObserver


  var onResize = opts.onResize;
  var onResizeRef = useRef(undefined);
  onResizeRef.current = onResize; // Using a single instance throughout the hook's lifetime

  var resizeObserverRef = useRef();

  var _useState = useState({
    width: undefined,
    height: undefined
  }),
      size = _useState[0],
      setSize = _useState[1]; // In certain edge cases the RO might want to report a size change just after
  // the component unmounted.


  var didUnmount = useRef(false);
  useEffect(function () {
    return function () {
      didUnmount.current = true;
    };
  }, []); // Using a ref to track the previous width / height to avoid unnecessary renders

  var previous = useRef({
    width: undefined,
    height: undefined
  }); // This block is kinda like a useEffect, only it's called whenever a new
  // element could be resolved based on the ref option. It also has a cleanup
  // function.

  var refCallback = useResolvedElement(function (element) {
    // Initialising the RO instance
    if (!resizeObserverRef.current) {
      // Saving a single instance, used by the hook from this point on.
      resizeObserverRef.current = new ResizeObserver(function (entries) {
        if (!Array.isArray(entries)) {
          return;
        } // Since we only observe the one element, we don't need to loop over the
        // array


        if (!entries.length) {
          return;
        }

        var entry = entries[0]; // `Math.round` is in line with how CSS resolves sub-pixel values

        var newWidth = Math.round(entry.contentRect.width);
        var newHeight = Math.round(entry.contentRect.height);

        if (previous.current.width !== newWidth || previous.current.height !== newHeight) {
          var newSize = {
            width: newWidth,
            height: newHeight
          };

          if (onResizeRef.current) {
            onResizeRef.current(newSize);
          } else {
            previous.current.width = newWidth;
            previous.current.height = newHeight;

            if (!didUnmount.current) {
              setSize(newSize);
            }
          }
        }
      });
    }

    resizeObserverRef.current.observe(element);
    return function () {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(element);
      }
    };
  }, opts.ref);
  return useMemo(function () {
    return {
      ref: refCallback,
      width: size.width,
      height: size.height
    };
  }, [refCallback, size ? size.width : null, size ? size.height : null]);
}

const is = {
  arr: Array.isArray,
  obj: a => Object.prototype.toString.call(a) === '[object Object]',
  fun: a => typeof a === 'function',
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === void 0,
  nul: a => a === null,
  set: a => a instanceof Set,
  map: a => a instanceof Map,

  equ(a, b) {
    if (typeof a !== typeof b) return false;
    if (is.str(a) || is.num(a)) return a === b;
    if (is.obj(a) && is.obj(b) && Object.keys(a).length + Object.keys(b).length === 0) return true;
    let i;

    for (i in a) if (!(i in b)) return false;

    for (i in b) if (a[i] !== b[i]) return false;

    return is.und(i) ? a === b : true;
  }

};

function merge(target, lowercase) {
  if (lowercase === void 0) {
    lowercase = true;
  }

  return object => (is.arr(object) ? object : Object.keys(object)).reduce((acc, element) => {
    const key = lowercase ? element[0].toLowerCase() + element.substring(1) : element;
    acc[key] = target(key);
    return acc;
  }, target);
}

function useForceUpdate() {
  const _useState = useState(false),
        f = _useState[1];

  const forceUpdate = useCallback(() => f(v => !v), []);
  return forceUpdate;
}

function withDefault(value, defaultValue) {
  return is.und(value) || is.nul(value) ? defaultValue : value;
}

function toArray(a) {
  return !is.und(a) ? is.arr(a) ? a : [a] : [];
}

function callProp(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return is.fun(obj) ? obj(...args) : obj;
}

function getForwardProps(props) {
  props.to;
        props.from;
        props.config;
        props.onStart;
        props.onRest;
        props.onFrame;
        props.children;
        props.reset;
        props.reverse;
        props.force;
        props.immediate;
        props.delay;
        props.attach;
        props.destroyed;
        props.interpolateTo;
        props.ref;
        props.lazy;
        const forward = _objectWithoutPropertiesLoose(props, ["to", "from", "config", "onStart", "onRest", "onFrame", "children", "reset", "reverse", "force", "immediate", "delay", "attach", "destroyed", "interpolateTo", "ref", "lazy"]);

  return forward;
}

function interpolateTo(props) {
  const forward = getForwardProps(props);
  if (is.und(forward)) return _extends({
    to: forward
  }, props);
  const rest = Object.keys(props).reduce((a, k) => !is.und(forward[k]) ? a : _extends({}, a, {
    [k]: props[k]
  }), {});
  return _extends({
    to: forward
  }, rest);
}

function handleRef(ref, forward) {
  if (forward) {
    // If it's a function, assume it's a ref callback
    if (is.fun(forward)) forward(ref);else if (is.obj(forward)) {
      forward.current = ref;
    }
  }

  return ref;
}

class Animated {
  constructor() {
    this.payload = void 0;
    this.children = [];
  }

  getAnimatedValue() {
    return this.getValue();
  }

  getPayload() {
    return this.payload || this;
  }

  attach() {}

  detach() {}

  getChildren() {
    return this.children;
  }

  addChild(child) {
    if (this.children.length === 0) this.attach();
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
    if (this.children.length === 0) this.detach();
  }

}

class AnimatedArray extends Animated {
  constructor() {
    super(...arguments);
    this.payload = [];

    this.attach = () => this.payload.forEach(p => p instanceof Animated && p.addChild(this));

    this.detach = () => this.payload.forEach(p => p instanceof Animated && p.removeChild(this));
  }

}

class AnimatedObject extends Animated {
  constructor() {
    super(...arguments);
    this.payload = {};

    this.attach = () => Object.values(this.payload).forEach(s => s instanceof Animated && s.addChild(this));

    this.detach = () => Object.values(this.payload).forEach(s => s instanceof Animated && s.removeChild(this));
  }

  getValue(animated) {
    if (animated === void 0) {
      animated = false;
    }

    const payload = {};

    for (const key in this.payload) {
      const value = this.payload[key];
      if (animated && !(value instanceof Animated)) continue;
      payload[key] = value instanceof Animated ? value[animated ? 'getAnimatedValue' : 'getValue']() : value;
    }

    return payload;
  }

  getAnimatedValue() {
    return this.getValue(true);
  }

}

let applyAnimatedValues;

function injectApplyAnimatedValues(fn, transform) {
  applyAnimatedValues = {
    fn,
    transform
  };
}

let colorNames;

function injectColorNames(names) {
  colorNames = names;
}

let requestFrame = cb => typeof window !== 'undefined' ? window.requestAnimationFrame(cb) : -1;

let interpolation;

function injectStringInterpolator(fn) {
  interpolation = fn;
}

let now = () => Date.now();

let animatedApi = node => node.current;

let createAnimatedStyle;

function injectCreateAnimatedStyle(factory) {
  createAnimatedStyle = factory;
}
/**
 * Wraps the `style` property with `AnimatedStyle`.
 */

class AnimatedProps extends AnimatedObject {
  constructor(props, callback) {
    super();
    this.update = void 0;
    this.payload = !props.style ? props : _extends({}, props, {
      style: createAnimatedStyle(props.style)
    });
    this.update = callback;
    this.attach();
  }

}

const isFunctionComponent = val => is.fun(val) && !(val.prototype instanceof React.Component);

const createAnimatedComponent = Component => {
  const AnimatedComponent = forwardRef((props, ref) => {
    const forceUpdate = useForceUpdate();
    const mounted = useRef(true);
    const propsAnimated = useRef(null);
    const node = useRef(null);
    const attachProps = useCallback(props => {
      const oldPropsAnimated = propsAnimated.current;

      const callback = () => {
        let didUpdate = false;

        if (node.current) {
          didUpdate = applyAnimatedValues.fn(node.current, propsAnimated.current.getAnimatedValue());
        }

        if (!node.current || didUpdate === false) {
          // If no referenced node has been found, or the update target didn't have a
          // native-responder, then forceUpdate the animation ...
          forceUpdate();
        }
      };

      propsAnimated.current = new AnimatedProps(props, callback);
      oldPropsAnimated && oldPropsAnimated.detach();
    }, []);
    useEffect(() => () => {
      mounted.current = false;
      propsAnimated.current && propsAnimated.current.detach();
    }, []);
    useImperativeHandle(ref, () => animatedApi(node));
    attachProps(props);

    const _getValue = propsAnimated.current.getValue();
          _getValue.scrollTop;
          _getValue.scrollLeft;
          const animatedProps = _objectWithoutPropertiesLoose(_getValue, ["scrollTop", "scrollLeft"]); // Functions cannot have refs, see:
    // See: https://github.com/react-spring/react-spring/issues/569


    const refFn = isFunctionComponent(Component) ? undefined : childRef => node.current = handleRef(childRef, ref);
    return React.createElement(Component, _extends({}, animatedProps, {
      ref: refFn
    }));
  });
  return AnimatedComponent;
};

let active = false;
const controllers = new Set();

const update = () => {
  if (!active) return false;
  let time = now();

  for (let controller of controllers) {
    let isActive = false;

    for (let configIdx = 0; configIdx < controller.configs.length; configIdx++) {
      let config = controller.configs[configIdx];
      let endOfAnimation, lastTime;

      for (let valIdx = 0; valIdx < config.animatedValues.length; valIdx++) {
        let animation = config.animatedValues[valIdx]; // If an animation is done, skip, until all of them conclude

        if (animation.done) continue;
        let from = config.fromValues[valIdx];
        let to = config.toValues[valIdx];
        let position = animation.lastPosition;
        let isAnimated = to instanceof Animated;
        let velocity = Array.isArray(config.initialVelocity) ? config.initialVelocity[valIdx] : config.initialVelocity;
        if (isAnimated) to = to.getValue(); // Conclude animation if it's either immediate, or from-values match end-state

        if (config.immediate) {
          animation.setValue(to);
          animation.done = true;
          continue;
        } // Break animation when string values are involved


        if (typeof from === 'string' || typeof to === 'string') {
          animation.setValue(to);
          animation.done = true;
          continue;
        }

        if (config.duration !== void 0) {
          /** Duration easing */
          position = from + config.easing((time - animation.startTime) / config.duration) * (to - from);
          endOfAnimation = time >= animation.startTime + config.duration;
        } else if (config.decay) {
          /** Decay easing */
          position = from + velocity / (1 - 0.998) * (1 - Math.exp(-(1 - 0.998) * (time - animation.startTime)));
          endOfAnimation = Math.abs(animation.lastPosition - position) < 0.1;
          if (endOfAnimation) to = position;
        } else {
          /** Spring easing */
          lastTime = animation.lastTime !== void 0 ? animation.lastTime : time;
          velocity = animation.lastVelocity !== void 0 ? animation.lastVelocity : config.initialVelocity; // If we lost a lot of frames just jump to the end.

          if (time > lastTime + 64) lastTime = time; // http://gafferongames.com/game-physics/fix-your-timestep/

          let numSteps = Math.floor(time - lastTime);

          for (let i = 0; i < numSteps; ++i) {
            let force = -config.tension * (position - to);
            let damping = -config.friction * velocity;
            let acceleration = (force + damping) / config.mass;
            velocity = velocity + acceleration * 1 / 1000;
            position = position + velocity * 1 / 1000;
          } // Conditions for stopping the spring animation


          let isOvershooting = config.clamp && config.tension !== 0 ? from < to ? position > to : position < to : false;
          let isVelocity = Math.abs(velocity) <= config.precision;
          let isDisplacement = config.tension !== 0 ? Math.abs(to - position) <= config.precision : true;
          endOfAnimation = isOvershooting || isVelocity && isDisplacement;
          animation.lastVelocity = velocity;
          animation.lastTime = time;
        } // Trails aren't done until their parents conclude


        if (isAnimated && !config.toValues[valIdx].done) endOfAnimation = false;

        if (endOfAnimation) {
          // Ensure that we end up with a round value
          if (animation.value !== to) position = to;
          animation.done = true;
        } else isActive = true;

        animation.setValue(position);
        animation.lastPosition = position;
      } // Keep track of updated values only when necessary


      if (controller.props.onFrame) controller.values[config.name] = config.interpolation.getValue();
    } // Update callbacks in the end of the frame


    if (controller.props.onFrame) controller.props.onFrame(controller.values); // Either call onEnd or next frame

    if (!isActive) {
      controllers.delete(controller);
      controller.stop(true);
    }
  } // Loop over as long as there are controllers ...


  if (controllers.size) {
    requestFrame(update);
  } else {
    active = false;
  }

  return active;
};

const start = controller => {
  if (!controllers.has(controller)) controllers.add(controller);

  if (!active) {
    active = true;
    requestFrame(update);
  }
};

const stop = controller => {
  if (controllers.has(controller)) controllers.delete(controller);
};

function createInterpolator(range, output, extrapolate) {
  if (typeof range === 'function') {
    return range;
  }

  if (Array.isArray(range)) {
    return createInterpolator({
      range,
      output: output,
      extrapolate
    });
  }

  if (interpolation && typeof range.output[0] === 'string') {
    return interpolation(range);
  }

  const config = range;
  const outputRange = config.output;
  const inputRange = config.range || [0, 1];
  const extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
  const extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';

  const easing = config.easing || (t => t);

  return input => {
    const range = findRange(input, inputRange);
    return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
  };
}

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  let result = map ? map(input) : input; // Extrapolate

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') return result;else if (extrapolateLeft === 'clamp') result = inputMin;
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') return result;else if (extrapolateRight === 'clamp') result = inputMax;
  }

  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax; // Input Range

  if (inputMin === -Infinity) result = -result;else if (inputMax === Infinity) result = result - inputMin;else result = (result - inputMin) / (inputMax - inputMin); // Easing

  result = easing(result); // Output Range

  if (outputMin === -Infinity) result = -result;else if (outputMax === Infinity) result = result + outputMin;else result = result * (outputMax - outputMin) + outputMin;
  return result;
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;

  return i - 1;
}

class AnimatedInterpolation extends AnimatedArray {
  constructor(parents, range, output, extrapolate) {
    super();
    this.calc = void 0;
    this.payload = parents instanceof AnimatedArray && !(parents instanceof AnimatedInterpolation) ? parents.getPayload() : Array.isArray(parents) ? parents : [parents];
    this.calc = createInterpolator(range, output, extrapolate);
  }

  getValue() {
    return this.calc(...this.payload.map(value => value.getValue()));
  }

  updateConfig(range, output, extrapolate) {
    this.calc = createInterpolator(range, output, extrapolate);
  }

  interpolate(range, output, extrapolate) {
    return new AnimatedInterpolation(this, range, output, extrapolate);
  }

}
/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an AnimatedValue is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */


function addAnimatedStyles(node, styles) {
  if ('update' in node) {
    styles.add(node);
  } else {
    node.getChildren().forEach(child => addAnimatedStyles(child, styles));
  }
}

class AnimatedValue extends Animated {
  constructor(_value) {
    var _this;

    super();
    _this = this;
    this.animatedStyles = new Set();
    this.value = void 0;
    this.startPosition = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.startTime = void 0;
    this.lastTime = void 0;
    this.done = false;

    this.setValue = function (value, flush) {
      if (flush === void 0) {
        flush = true;
      }

      _this.value = value;
      if (flush) _this.flush();
    };

    this.value = _value;
    this.startPosition = _value;
    this.lastPosition = _value;
  }

  flush() {
    if (this.animatedStyles.size === 0) {
      addAnimatedStyles(this, this.animatedStyles);
    }

    this.animatedStyles.forEach(animatedStyle => animatedStyle.update());
  }

  clearStyles() {
    this.animatedStyles.clear();
  }

  getValue() {
    return this.value;
  }

  interpolate(range, output, extrapolate) {
    return new AnimatedInterpolation(this, range, output, extrapolate);
  }

}

class AnimatedValueArray extends AnimatedArray {
  constructor(values) {
    super();
    this.payload = values.map(n => new AnimatedValue(n));
  }

  setValue(value, flush) {
    if (flush === void 0) {
      flush = true;
    }

    if (Array.isArray(value)) {
      if (value.length === this.payload.length) {
        value.forEach((v, i) => this.payload[i].setValue(v, flush));
      }
    } else {
      this.payload.forEach(p => p.setValue(value, flush));
    }
  }

  getValue() {
    return this.payload.map(v => v.getValue());
  }

  interpolate(range, output) {
    return new AnimatedInterpolation(this, range, output);
  }

}

let G = 0;

class Controller {
  constructor() {
    this.id = void 0;
    this.idle = true;
    this.hasChanged = false;
    this.guid = 0;
    this.local = 0;
    this.props = {};
    this.merged = {};
    this.animations = {};
    this.interpolations = {};
    this.values = {};
    this.configs = [];
    this.listeners = [];
    this.queue = [];
    this.localQueue = void 0;

    this.getValues = () => this.interpolations;

    this.id = G++;
  }
  /** update(props)
   *  This function filters input props and creates an array of tasks which are executed in .start()
   *  Each task is allowed to carry a delay, which means it can execute asnychroneously */


  update(args) {
    //this._id = n + this.id
    if (!args) return this; // Extract delay and the to-prop from props

    const _ref = interpolateTo(args),
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 0 : _ref$delay,
          to = _ref.to,
          props = _objectWithoutPropertiesLoose(_ref, ["delay", "to"]);

    if (is.arr(to) || is.fun(to)) {
      // If config is either a function or an array queue it up as is
      this.queue.push(_extends({}, props, {
        delay,
        to
      }));
    } else if (to) {
      // Otherwise go through each key since it could be delayed individually
      let ops = {};
      Object.entries(to).forEach(_ref2 => {
        let k = _ref2[0],
            v = _ref2[1]; // Fetch delay and create an entry, consisting of the to-props, the delay, and basic props

        const entry = _extends({
          to: {
            [k]: v
          },
          delay: callProp(delay, k)
        }, props);

        const previous = ops[entry.delay] && ops[entry.delay].to;
        ops[entry.delay] = _extends({}, ops[entry.delay], entry, {
          to: _extends({}, previous, entry.to)
        });
      });
      this.queue = Object.values(ops);
    } // Sort queue, so that async calls go last


    this.queue = this.queue.sort((a, b) => a.delay - b.delay); // Diff the reduced props immediately (they'll contain the from-prop and some config)

    this.diff(props);
    return this;
  }
  /** start(onEnd)
   *  This function either executes a queue, if present, or starts the frameloop, which animates */


  start(onEnd) {
    // If a queue is present we must excecute it
    if (this.queue.length) {
      this.idle = false; // Updates can interrupt trailing queues, in that case we just merge values

      if (this.localQueue) {
        this.localQueue.forEach(_ref3 => {
          let _ref3$from = _ref3.from,
              from = _ref3$from === void 0 ? {} : _ref3$from,
              _ref3$to = _ref3.to,
              to = _ref3$to === void 0 ? {} : _ref3$to;
          if (is.obj(from)) this.merged = _extends({}, from, this.merged);
          if (is.obj(to)) this.merged = _extends({}, this.merged, to);
        });
      } // The guid helps us tracking frames, a new queue over an old one means an override
      // We discard async calls in that caseÍ


      const local = this.local = ++this.guid;
      const queue = this.localQueue = this.queue;
      this.queue = []; // Go through each entry and execute it

      queue.forEach((_ref4, index) => {
        let delay = _ref4.delay,
            props = _objectWithoutPropertiesLoose(_ref4, ["delay"]);

        const cb = finished => {
          if (index === queue.length - 1 && local === this.guid && finished) {
            this.idle = true;
            if (this.props.onRest) this.props.onRest(this.merged);
          }

          if (onEnd) onEnd();
        }; // Entries can be delayed, ansyc or immediate


        let async = is.arr(props.to) || is.fun(props.to);

        if (delay) {
          setTimeout(() => {
            if (local === this.guid) {
              if (async) this.runAsync(props, cb);else this.diff(props).start(cb);
            }
          }, delay);
        } else if (async) this.runAsync(props, cb);else this.diff(props).start(cb);
      });
    } // Otherwise we kick of the frameloop
    else {
        if (is.fun(onEnd)) this.listeners.push(onEnd);
        if (this.props.onStart) this.props.onStart();
        start(this);
      }

    return this;
  }

  stop(finished) {
    this.listeners.forEach(onEnd => onEnd(finished));
    this.listeners = [];
    return this;
  }
  /** Pause sets onEnd listeners free, but also removes the controller from the frameloop */


  pause(finished) {
    this.stop(true);
    if (finished) stop(this);
    return this;
  }

  runAsync(_ref5, onEnd) {
    var _this = this;

    _ref5.delay;
        let props = _objectWithoutPropertiesLoose(_ref5, ["delay"]);

    const local = this.local; // If "to" is either a function or an array it will be processed async, therefor "to" should be empty right now
    // If the view relies on certain values "from" has to be present

    let queue = Promise.resolve(undefined);

    if (is.arr(props.to)) {
      for (let i = 0; i < props.to.length; i++) {
        const index = i;

        const fresh = _extends({}, props, interpolateTo(props.to[index]));

        if (is.arr(fresh.config)) fresh.config = fresh.config[index];
        queue = queue.then(() => {
          //this.stop()
          if (local === this.guid) return new Promise(r => this.diff(fresh).start(r));
        });
      }
    } else if (is.fun(props.to)) {
      let index = 0;
      let last;
      queue = queue.then(() => props.to( // next(props)
      p => {
        const fresh = _extends({}, props, interpolateTo(p));

        if (is.arr(fresh.config)) fresh.config = fresh.config[index];
        index++; //this.stop()

        if (local === this.guid) return last = new Promise(r => this.diff(fresh).start(r));
        return;
      }, // cancel()
      function (finished) {
        if (finished === void 0) {
          finished = true;
        }

        return _this.stop(finished);
      }).then(() => last));
    }

    queue.then(onEnd);
  }

  diff(props) {
    this.props = _extends({}, this.props, props);
    let _this$props = this.props,
        _this$props$from = _this$props.from,
        from = _this$props$from === void 0 ? {} : _this$props$from,
        _this$props$to = _this$props.to,
        to = _this$props$to === void 0 ? {} : _this$props$to,
        _this$props$config = _this$props.config,
        config = _this$props$config === void 0 ? {} : _this$props$config,
        reverse = _this$props.reverse,
        attach = _this$props.attach,
        reset = _this$props.reset,
        immediate = _this$props.immediate; // Reverse values when requested

    if (reverse) {
      var _ref6 = [to, from];
      from = _ref6[0];
      to = _ref6[1];
    } // This will collect all props that were ever set, reset merged props when necessary


    this.merged = _extends({}, from, this.merged, to);
    this.hasChanged = false; // Attachment handling, trailed springs can "attach" themselves to a previous spring

    let target = attach && attach(this); // Reduces input { name: value } pairs into animated values

    this.animations = Object.entries(this.merged).reduce((acc, _ref7) => {
      let name = _ref7[0],
          value = _ref7[1]; // Issue cached entries, except on reset

      let entry = acc[name] || {}; // Figure out what the value is supposed to be

      const isNumber = is.num(value);
      const isString = is.str(value) && !value.startsWith('#') && !/\d/.test(value) && !colorNames[value];
      const isArray = is.arr(value);
      const isInterpolation = !isNumber && !isArray && !isString;
      let fromValue = !is.und(from[name]) ? from[name] : value;
      let toValue = isNumber || isArray ? value : isString ? value : 1;
      let toConfig = callProp(config, name);
      if (target) toValue = target.animations[name].parent;
      let parent = entry.parent,
          interpolation$$1 = entry.interpolation,
          toValues = toArray(target ? toValue.getPayload() : toValue),
          animatedValues;
      let newValue = value;
      if (isInterpolation) newValue = interpolation({
        range: [0, 1],
        output: [value, value]
      })(1);
      let currentValue = interpolation$$1 && interpolation$$1.getValue(); // Change detection flags

      const isFirst = is.und(parent);
      const isActive = !isFirst && entry.animatedValues.some(v => !v.done);
      const currentValueDiffersFromGoal = !is.equ(newValue, currentValue);
      const hasNewGoal = !is.equ(newValue, entry.previous);
      const hasNewConfig = !is.equ(toConfig, entry.config); // Change animation props when props indicate a new goal (new value differs from previous one)
      // and current values differ from it. Config changes trigger a new update as well (though probably shouldn't?)

      if (reset || hasNewGoal && currentValueDiffersFromGoal || hasNewConfig) {
        // Convert regular values into animated values, ALWAYS re-use if possible
        if (isNumber || isString) parent = interpolation$$1 = entry.parent || new AnimatedValue(fromValue);else if (isArray) parent = interpolation$$1 = entry.parent || new AnimatedValueArray(fromValue);else if (isInterpolation) {
          let prev = entry.interpolation && entry.interpolation.calc(entry.parent.value);
          prev = prev !== void 0 && !reset ? prev : fromValue;

          if (entry.parent) {
            parent = entry.parent;
            parent.setValue(0, false);
          } else parent = new AnimatedValue(0);

          const range = {
            output: [prev, value]
          };

          if (entry.interpolation) {
            interpolation$$1 = entry.interpolation;
            entry.interpolation.updateConfig(range);
          } else interpolation$$1 = parent.interpolate(range);
        }
        toValues = toArray(target ? toValue.getPayload() : toValue);
        animatedValues = toArray(parent.getPayload());
        if (reset && !isInterpolation) parent.setValue(fromValue, false);
        this.hasChanged = true; // Reset animated values

        animatedValues.forEach(value => {
          value.startPosition = value.value;
          value.lastPosition = value.value;
          value.lastVelocity = isActive ? value.lastVelocity : undefined;
          value.lastTime = isActive ? value.lastTime : undefined;
          value.startTime = now();
          value.done = false;
          value.animatedStyles.clear();
        }); // Set immediate values

        if (callProp(immediate, name)) {
          parent.setValue(isInterpolation ? toValue : value, false);
        }

        return _extends({}, acc, {
          [name]: _extends({}, entry, {
            name,
            parent,
            interpolation: interpolation$$1,
            animatedValues,
            toValues,
            previous: newValue,
            config: toConfig,
            fromValues: toArray(parent.getValue()),
            immediate: callProp(immediate, name),
            initialVelocity: withDefault(toConfig.velocity, 0),
            clamp: withDefault(toConfig.clamp, false),
            precision: withDefault(toConfig.precision, 0.01),
            tension: withDefault(toConfig.tension, 170),
            friction: withDefault(toConfig.friction, 26),
            mass: withDefault(toConfig.mass, 1),
            duration: toConfig.duration,
            easing: withDefault(toConfig.easing, t => t),
            decay: toConfig.decay
          })
        });
      } else {
        if (!currentValueDiffersFromGoal) {
          // So ... the current target value (newValue) appears to be different from the previous value,
          // which normally constitutes an update, but the actual value (currentValue) matches the target!
          // In order to resolve this without causing an animation update we silently flag the animation as done,
          // which it technically is. Interpolations also needs a config update with their target set to 1.
          if (isInterpolation) {
            parent.setValue(1, false);
            interpolation$$1.updateConfig({
              output: [newValue, newValue]
            });
          }

          parent.done = true;
          this.hasChanged = true;
          return _extends({}, acc, {
            [name]: _extends({}, acc[name], {
              previous: newValue
            })
          });
        }

        return acc;
      }
    }, this.animations);

    if (this.hasChanged) {
      // Make animations available to frameloop
      this.configs = Object.values(this.animations);
      this.values = {};
      this.interpolations = {};

      for (let key in this.animations) {
        this.interpolations[key] = this.animations[key].interpolation;
        this.values[key] = this.animations[key].interpolation.getValue();
      }
    }

    return this;
  }

  destroy() {
    this.stop();
    this.props = {};
    this.merged = {};
    this.animations = {};
    this.interpolations = {};
    this.values = {};
    this.configs = [];
    this.local = 0;
  }

}
/** API
 * const props = useSprings(number, [{ ... }, { ... }, ...])
 * const [props, set] = useSprings(number, (i, controller) => ({ ... }))
 */


const useSprings = (length, props) => {
  const mounted = useRef(false);
  const ctrl = useRef();
  const isFn = is.fun(props); // The controller maintains the animation values, starts and stops animations

  const _useMemo = useMemo(() => {
    // Remove old controllers
    if (ctrl.current) {
      ctrl.current.map(c => c.destroy());
      ctrl.current = undefined;
    }

    let ref;
    return [new Array(length).fill().map((_, i) => {
      const ctrl = new Controller();
      const newProps = isFn ? callProp(props, i, ctrl) : props[i];
      if (i === 0) ref = newProps.ref;
      ctrl.update(newProps);
      if (!ref) ctrl.start();
      return ctrl;
    }), ref];
  }, [length]),
        controllers = _useMemo[0],
        ref = _useMemo[1];

  ctrl.current = controllers; // The hooks reference api gets defined here ...

  useImperativeHandle(ref, () => ({
    start: () => Promise.all(ctrl.current.map(c => new Promise(r => c.start(r)))),
    stop: finished => ctrl.current.forEach(c => c.stop(finished)),

    get controllers() {
      return ctrl.current;
    }

  })); // This function updates the controllers

  const updateCtrl = useMemo(() => updateProps => ctrl.current.map((c, i) => {
    c.update(isFn ? callProp(updateProps, i, c) : updateProps[i]);
    if (!ref) c.start();
  }), [length]); // Update controller if props aren't functional

  useEffect(() => {
    if (mounted.current) {
      if (!isFn) updateCtrl(props);
    } else if (!ref) ctrl.current.forEach(c => c.start());
  }); // Update mounted flag and destroy controller on unmount

  useEffect(() => (mounted.current = true, () => ctrl.current.forEach(c => c.destroy())), []); // Return animated props, or, anim-props + the update-setter above

  const propValues = ctrl.current.map(c => c.getValues());
  return isFn ? [propValues, updateCtrl, finished => ctrl.current.forEach(c => c.pause(finished))] : propValues;
};
/** API
 * const props = useSpring({ ... })
 * const [props, set] = useSpring(() => ({ ... }))
 */


const useSpring = props => {
  const isFn = is.fun(props);

  const _useSprings = useSprings(1, isFn ? props : [props]),
        result = _useSprings[0],
        set = _useSprings[1],
        pause = _useSprings[2];

  return isFn ? [result[0], set, pause] : result;
};

class AnimatedStyle extends AnimatedObject {
  constructor(style) {
    if (style === void 0) {
      style = {};
    }

    super();

    if (style.transform && !(style.transform instanceof Animated)) {
      style = applyAnimatedValues.transform(style);
    }

    this.payload = style;
  }

} // http://www.w3.org/TR/css3-color/#svg-color


const colors = {
  transparent: 0x00000000,
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff
}; // const INTEGER = '[-+]?\\d+';

const NUMBER = '[-+]?\\d*\\.?\\d+';
const PERCENTAGE = NUMBER + '%';

function call() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}

const rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
const rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
const hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
const hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const hex8 = /^#([0-9a-fA-F]{8})$/;
/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function normalizeColor(color) {
  let match;

  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 0xffffffff ? color : null;
  } // Ordered based on occurrences on Facebook codebase


  if (match = hex6.exec(color)) return parseInt(match[1] + 'ff', 16) >>> 0;
  if (colors.hasOwnProperty(color)) return colors[color];

  if (match = rgb.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    0x000000ff) >>> // a
    0;
  }

  if (match = rgba.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }

  if (match = hex3.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    'ff', // a
    16) >>> 0;
  } // https://drafts.csswg.org/css-color-4/#hex-notation


  if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

  if (match = hex4.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    match[4] + match[4], // a
    16) >>> 0;
  }

  if (match = hsl.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | 0x000000ff) >>> // a
    0;
  }

  if (match = hsla.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | parse1(match[4])) >>> // a
    0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}

function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}

function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}

function parse1(str) {
  const num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}

function parsePercentage(str) {
  // parseFloat conveniently ignores the final %
  const int = parseFloat(str);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}

function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  let r = (int32Color & 0xff000000) >>> 24;
  let g = (int32Color & 0x00ff0000) >>> 16;
  let b = (int32Color & 0x0000ff00) >>> 8;
  let a = (int32Color & 0x000000ff) / 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
} // Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662


const stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; // Covers rgb, rgba, hsl, hsla
// Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e

const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi; // Covers color names (transparent, blue, etc.)

const colorNamesRegex = new RegExp(`(${Object.keys(colors).join('|')})`, 'g');
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36)           // colors
 *   -45deg                            // values with units
 *   0 2px 2px 0px rgba(0, 0, 0, 0.12) // box shadows
 */

const createStringInterpolator = config => {
  // Replace colors with rgba
  const outputRange = config.output.map(rangeValue => rangeValue.replace(colorRegex, colorToRgba)).map(rangeValue => rangeValue.replace(colorNamesRegex, colorToRgba));
  const outputRanges = outputRange[0].match(stringShapeRegex).map(() => []);
  outputRange.forEach(value => {
    value.match(stringShapeRegex).forEach((number, i) => outputRanges[i].push(+number));
  });
  const interpolations = outputRange[0].match(stringShapeRegex).map((_value, i) => createInterpolator(_extends({}, config, {
    output: outputRanges[i]
  })));
  return input => {
    let i = 0;
    return outputRange[0] // 'rgba(0, 100, 200, 0)'
    // ->
    // 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'
    .replace(stringShapeRegex, () => interpolations[i++](input)) // rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
    // round the opacity (4th column).
    .replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`);
  };
};

let isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);

function dangerousStyleValue(name, value, isCustomProperty) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim();
}

const attributeCache = {};
injectCreateAnimatedStyle(style => new AnimatedStyle(style));
injectStringInterpolator(createStringInterpolator);
injectColorNames(colors);
injectApplyAnimatedValues((instance, props) => {
  if (instance.nodeType && instance.setAttribute !== undefined) {
    const style = props.style,
          children = props.children,
          scrollTop = props.scrollTop,
          scrollLeft = props.scrollLeft,
          attributes = _objectWithoutPropertiesLoose(props, ["style", "children", "scrollTop", "scrollLeft"]);

    const filter = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';
    if (scrollTop !== void 0) instance.scrollTop = scrollTop;
    if (scrollLeft !== void 0) instance.scrollLeft = scrollLeft; // Set textContent, if children is an animatable value

    if (children !== void 0) instance.textContent = children; // Set styles ...

    for (let styleName in style) {
      if (!style.hasOwnProperty(styleName)) continue;
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = dangerousStyleValue(styleName, style[styleName], isCustomProperty);
      if (styleName === 'float') styleName = 'cssFloat';
      if (isCustomProperty) instance.style.setProperty(styleName, styleValue);else instance.style[styleName] = styleValue;
    } // Set attributes ...


    for (let name in attributes) {
      // Attributes are written in dash case
      const dashCase = filter ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, n => '-' + n.toLowerCase()));
      if (typeof instance.getAttribute(dashCase) !== 'undefined') instance.setAttribute(dashCase, attributes[name]);
    }

    return;
  } else return false;
}, style => style);
const domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan']; // Extend animated with all the available THREE elements

const apply = merge(createAnimatedComponent, false);
const extendedAnimated = apply(domElements);

function Orbit(props) {
    var orbitRadius = props.orbitRadius, planetWidth = props.planetWidth, planetHeight = props.planetHeight, open = props.open, tension = props.tension, friction = props.friction, mass = props.mass;
    var classes = useStyles(props);
    var theme = useTheme();
    var position = useSpring({
        reverse: !open,
        from: getInitalOrbitPosition(planetWidth, planetHeight),
        to: getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius),
        config: { mass: mass, tension: tension, friction: friction },
    });
    return jsx(extendedAnimated.div, { className: classes.orbit, style: __assign(__assign({}, position), { boxShadow: theme.shadows[props.elevation], background: props.color }) }, void 0);
}
function getInitalOrbitPosition(planetWidth, planetHeight) {
    return {
        width: 0,
        height: 0,
        top: planetWidth / 2,
        left: planetHeight / 2,
        opacity: 0,
    };
}
function getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius) {
    return {
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        top: 0 - orbitRadius + planetHeight / 2,
        left: 0 - orbitRadius + planetWidth / 2,
        opacity: 1,
    };
}
var orbitDefaultStyle = {
    position: "absolute",
    borderRadius: "100%",
    zIndex: 0,
};
var useStyles = makeStyles({
    orbit: function (props) {
        return props.orbitStyle ? props.orbitStyle(orbitDefaultStyle) : orbitDefaultStyle;
    },
});

function Satellite(props) {
    var children = props.children, index = props.index, satelliteCount = props.satelliteCount, open = props.open, planetWidth = props.planetWidth, planetHeight = props.planetHeight, tension = props.tension, friction = props.friction, mass = props.mass, orbitRadius = props.orbitRadius, rotation = props.rotation, orientation = props.orientation, angle = props.angle;
    var classes = useStyles$1(props);
    var _a = useResizeObserver(), ref = _a.ref, _b = _a.height, height = _b === void 0 ? 0 : _b, _c = _a.width, width = _c === void 0 ? 0 : _c;
    var position = useSpring({
        reverse: !open,
        from: getInitalSatellitePosition(width, height, planetWidth, planetHeight),
        to: getFinalSatellitePosition(index, satelliteCount, width, height, planetWidth, planetHeight, orbitRadius, rotation, angle, orientation),
        config: { mass: mass, tension: tension, friction: friction },
    });
    return (jsx(extendedAnimated.div, __assign({ className: classes.root, style: position }, { children: jsx("div", __assign({ ref: ref }, { children: children }), void 0) }), void 0));
}
function getFinalSatellitePosition(index, satelliteCount, width, height, planetWidth, planetHeight, orbitRadius, rotation, deg, orientation) {
    var _a = getFinalDeltaPositions(index, satelliteCount, width, height, orbitRadius, rotation, deg), deltaX = _a.deltaX, deltaY = _a.deltaY, angle = _a.angle;
    var transform = {};
    switch (orientation) {
        case "OUTSIDE":
            transform = { transform: "rotate(" + angle + "deg)" };
            break;
        case "INSIDE":
            transform = { transform: "rotate(" + (angle + 180) + "deg)" };
            break;
        case "READABLE":
            transform =
                angle > 90 && angle < 270
                    ? { transform: "rotate(" + (angle + 180) + "deg)" }
                    : { transform: "rotate(" + angle + "deg)" };
            break;
        default:
            transform = { transform: "rotate(" + 0 + "deg)" };
    }
    return __assign({ top: planetHeight / 2 + deltaX, left: planetWidth / 2 - deltaY, opacity: 1 }, transform);
}
function getInitalSatellitePosition(width, height, planetWidth, planetHeight) {
    return {
        top: planetHeight / 2 - height / 2,
        left: planetWidth / 2 - width / 2,
        opacity: 0,
    };
}
function getFinalDeltaPositions(index, satelliteCount, width, height, orbitRadius, rotation, angle) {
    var SEPARATION_ANGLE = angle / satelliteCount;
    var FAN_ANGLE = (satelliteCount - 1) * SEPARATION_ANGLE;
    var BASE_ANGLE = (180 - FAN_ANGLE) / 2 + 90 + rotation;
    var TARGET_ANGLE = BASE_ANGLE + index * SEPARATION_ANGLE;
    return {
        deltaX: orbitRadius * Math.cos(toRadians(TARGET_ANGLE)) - height / 2,
        deltaY: orbitRadius * Math.sin(toRadians(TARGET_ANGLE)) + width / 2,
        angle: TARGET_ANGLE,
    };
}
var useStyles$1 = makeStyles({
    root: function (props) { return ({
        position: "absolute",
        zIndex: props.open ? 2 : 0,
    }); },
});
// UTILITY FUNCTIONS
var DEG_TO_RAD = 0.0174533;
function toRadians(degrees) {
    return degrees * DEG_TO_RAD;
}

var DEFAULT_MASS = 1;
var DEFAULT_TENSTION = 500;
var DEFAULT_FRICTION = 17;
var DEFAULT_ROTATION = 0;
var DEFAULT_OBITRADIUS = 90;
var DEFAULT_RADIUS = 60;
function Planet(props) {
    var centerContent = props.centerContent, children = props.children, open = props.open, onClick = props.onClick, mass = props.mass, tension = props.tension, friction = props.friction, orbitRadius = props.orbitRadius, radius = props.radius, rotation = props.rotation, orbitStyle = props.orbitStyle, hideOrbit = props.hideOrbit, onClose = props.onClose, autoClose = props.autoClose, angle = props.angle, color = props.color, dragableSatellites = props.dragableSatellites, dragRadiusSatellites = props.dragRadiusSatellites, elevation = props.elevation, satelliteOrientation = props.satelliteOrientation;
    var classes = useStyles$2(props);
    var _a = useResizeObserver(), ref = _a.ref, _b = _a.height, height = _b === void 0 ? 0 : _b, _c = _a.width, width = _c === void 0 ? 0 : _c;
    var _d = __read(useState(!!open), 2), _open = _d[0], setOpen = _d[1];
    useEffect(function () {
        if (!!open !== _open) {
            setOpen(!!open);
        }
    }, [open]);
    var satellites = [];
    var satelliteCount = Children.count(children);
    Children.forEach(children, function (c, i) {
        satellites[i] = function () { return (jsx(Satellite, __assign({ angle: angle !== null && angle !== void 0 ? angle : 360, index: i, open: _open, satelliteCount: satelliteCount, planetHeight: height, planetWidth: width, mass: mass ? mass : DEFAULT_MASS, friction: friction ? friction : DEFAULT_FRICTION, tension: tension ? tension : DEFAULT_TENSTION, orbitRadius: radius ? radius : DEFAULT_RADIUS, rotation: rotation ? rotation : DEFAULT_ROTATION, dragable: !!dragableSatellites, dragRadius: dragRadiusSatellites, orientation: satelliteOrientation }, { children: c }), i)); };
    });
    var onPlanet = function (e) {
        if (onClick) {
            onClick(e);
        }
        else {
            if (_open && autoClose) {
                setOpen(false);
                if (onClose) {
                    onClose(e);
                }
            }
            else {
                setOpen(true);
            }
        }
    };
    var onClickAway = function (e) {
        if (autoClose && _open) {
            setOpen(false);
        }
        if (onClose && _open) {
            onClose(e);
        }
    };
    return (jsx(ClickAwayListener, __assign({ onClickAway: onClickAway }, { children: jsxs("div", __assign({ className: classes.root }, { children: [!hideOrbit && _open && (jsx(Orbit, { elevation: elevation !== null && elevation !== void 0 ? elevation : 2, color: color !== null && color !== void 0 ? color : "transpalent", open: _open, orbitStyle: orbitStyle, planetHeight: height, planetWidth: width, mass: mass ? mass : DEFAULT_MASS, friction: friction ? friction : DEFAULT_FRICTION, tension: tension ? tension : DEFAULT_TENSTION, orbitRadius: orbitRadius ? orbitRadius : DEFAULT_OBITRADIUS }, void 0)),
                _open && (jsx(Fragment$1, { children: satellites.map(function (e) { return e(); }) }, void 0)),
                jsx("div", __assign({ className: classes.planetContent, onClick: onPlanet }, { children: jsx("div", __assign({ ref: ref }, { children: centerContent }), void 0) }), void 0)] }), void 0) }), void 0));
}
var useStyles$2 = makeStyles({
    root: {
        position: "relative",
    },
    planetContent: {
        position: "absolute",
        zIndex: 1,
    },
});

function PostCardMenu(props) {
    var _a = __read(useState(false), 2), isMenuOpened = _a[0], setIsMenuOpened = _a[1];
    var theme = useTheme();
    var deletePresed = props.deletePresed, editPressed = props.editPressed, previewPressed = props.previewPressed;
    return (jsxs(Planet, __assign({ color: theme.palette.secondary.light, autoClose: true, angle: 270, rotation: -90, orbitRadius: 72, radius: 72 * 0.6666, onClose: function () { return setIsMenuOpened(false); }, centerContent: jsx(Fab, __assign({ color: "secondary", size: "small", onClick: function () { return setIsMenuOpened(true); }, style: {
                boxShadow: isMenuOpened ? "none" : undefined,
                filter: isMenuOpened ? "Brightness(0.8)" : undefined
            } }, { children: jsx(Icon, { children: "toc" }, void 0) }), void 0) }, { children: [!props.disableDeleteButton && jsx(IconButton, __assign({ disabled: props.disableDeleteButton, color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return deletePresed(); } }, { children: jsx(Icon, { children: "delete" }, void 0) }), void 0),
            jsx(IconButton, __assign({ color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return previewPressed(); } }, { children: jsx(Icon, { children: "visibility" }, void 0) }), void 0),
            !props.disableEditButton && jsx(IconButton, __assign({ disabled: props.disableEditButton, color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return editPressed(); } }, { children: jsx(Icon, { children: "edit" }, void 0) }), void 0)] }), void 0));
}

function PostCard(props) {
    var _a;
    var classes = useStyles$3();
    var content = props.content, deletePresed = props.deletePresed, editPressed = props.editPressed, previewPressed = props.previewPressed;
    return (jsx(Card, __assign({ className: classes.card, elevation: 5 }, { children: jsxs(Box, __assign({ display: "flex", flexDirection: "column", height: "100%" }, { children: [jsxs(Box, __assign({ className: classes.profile }, { children: [jsx(Avatar, __assign({ src: axios.defaults.baseURL + services.authService.loginInfo.avatar, style: {
                                width: "32px",
                                height: "32px",
                                background: theme.palette.primary.main
                            } }, { children: content.createdBy.name[0] }), void 0),
                        jsx(Typography, __assign({ className: classes.profileText, variant: "h6", noWrap: true }, { children: props.content.createdBy.name }), void 0)] }), void 0),
                jsx("img", { alt: content.title, src: content.thumbnail ? axios.defaults.baseURL + content.thumbnail : "", height: "148px", style: {
                        objectFit: "cover",
                        background: "rgba(127, 127, 127, 0.1"
                    } }, void 0),
                jsxs(Box, __assign({ p: 2, flex: "1 1 auto", zIndex: "1", display: "flex", flexDirection: "column" }, { children: [jsx(Box, __assign({ position: "relative", display: "flex", width: "100%" }, { children: jsx(Box, __assign({ className: classes.menuButton }, { children: jsx(PostCardMenu, { previewPressed: previewPressed, deletePresed: deletePresed, editPressed: editPressed, disableDeleteButton: services.authService.loginInfo.role <= RoleType.Post &&
                                        content.createdBy.name !== services.authService.loginInfo.name, disableEditButton: services.authService.loginInfo.role <= RoleType.Post &&
                                        content.createdBy.name !== services.authService.loginInfo.name }, void 0) }), void 0) }), void 0),
                        jsx(Box, __assign({ className: classes.title }, { children: jsx(WrappedTextBlock, __assign({ color: "inherit", variant: "h6", noWrap: true, row: 2 }, { children: content.title }), void 0) }), void 0),
                        jsx(Box, __assign({ height: "72px", mt: 1 }, { children: jsx(WrappedTextBlock, __assign({ color: "textSecondary", row: 3, variant: "caption", fontSize: "10px" }, { children: content.description.substr(0, 1024).replace(/<[^>]*>?/gm, "").replace(/&[^;]*;?/gm, "") }), void 0) }), void 0),
                        jsxs(Box, __assign({ display: "flex", alignItems: "center" }, { children: [jsx(Box, { children: jsx(Typography, __assign({ variant: "caption" }, { children: postStatusTypeDisplay[props.content.status] }), void 0) }, void 0),
                                jsx(FlexSpacer, {}, void 0)] }), void 0),
                        jsx(Box, __assign({ display: "flex" }, { children: jsx(DateTimeText, { showTime: true, color: "textSecondary", fontSize: "12px", date: ((_a = props.content.publishIn) !== null && _a !== void 0 ? _a : props.content.createdAt).toJSDate() }, void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}
var useStyles$3 = makeStyles({
    card: {
        width: "100%",
        height: "348px",
        borderRadius: "0px",
        position: "relative"
    },
    img: {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    },
    title: {},
    menuButton: {
        position: "absolute",
        right: "36px",
        top: "-40px"
    },
    profile: {
        height: "28px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "8px",
        left: "8px",
        right: "8px",
        bottom: "8px"
    },
    profileText: {
        marginLeft: "8px",
        color: "white",
        width: "200%",
        textShadow: "1px 1px 4px #bbbbbb"
    }
});

function PostSearchPagingBar(props) {
    var n = props.count / props.fetch;
    var count = Number.isInteger(n) ? n : Math.floor(props.count / props.fetch) + 1;
    return jsxs("div", { children: [props.count, " \u4EF6\u4E2D", Math.min(props.offset + 1, props.count), " - ", Math.min(props.offset + props.fetch, props.count), jsx(Pagination$1, { color: "primary", count: count, page: props.offset / props.fetch + 1, onChange: function (_, v) { return props.onChange({
                    offset: (v - 1) * props.fetch,
                    fetch: props.fetch
                }); } }, void 0)] }, void 0);
}

var PostListPanel = observer(function (props) {
    var _a, _b, _c, _d;
    var history = useHistory();
    var location = useLocation();
    var query = new URLSearchParams(location.search);
    useEffect(function () {
        var _a;
        var page = Number((_a = query.get("page")) !== null && _a !== void 0 ? _a : 1);
        var postType = services.postManagementsService.selected;
        services.postsService.setSearchOption(__assign(__assign({}, services.postsService.searchOption), { offset: services.postsService.searchOption.fetch * (page - 1), fetch: (postType === null || postType === void 0 ? void 0 : postType.displayFormat) === "card" ? 30 : 60 }));
        searchAsync();
    }, [services.postManagementsService.selected]);
    function searchAsync() {
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selected = services.postManagementsService.selected;
                        if (!selected) return [3 /*break*/, 2];
                        return [4 /*yield*/, services.postsService.searchPostsAsync(selected.taxonomy.name)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function handleChangePage(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                history.replace(location.pathname + "?page=" + ((e.offset / e.fetch) + 1));
                return [2 /*return*/];
            });
        });
    }
    function onDeletePresed(post) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, confirmAsync("削除しますか?")];
                    case 1:
                        if (!_c.sent()) return [3 /*break*/, 3];
                        selected = services.postManagementsService.selected;
                        return [4 /*yield*/, services.postsService.deleteFromId((_b = (_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.name) !== null && _b !== void 0 ? _b : "", post.contentId)];
                    case 2:
                        _c.sent();
                        if (selected) {
                            services.postsService.searchPostsAsync(selected.taxonomy.name);
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function onEditPressed(post) {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/" + post.contentId + "/edit");
        }
    }
    function onPreviewPressed(contentId) {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/" + contentId);
        }
    }
    return (jsxs(Box, __assign({ height: "100%", display: "flex", flexDirection: "column" }, { children: [jsxs(Box, { children: [jsxs(Box, __assign({ p: 2, display: "flex", alignItems: "center", flexWrap: "wrap" }, { children: [jsx(Typography, { children: "\u4E00\u89A7" }, void 0),
                            jsx(Box, { flex: "1 1 auto" }, void 0),
                            jsx(PostSearchPagingBar, { offset: services.postsService.searchOption.offset, count: services.postsService.hitCount, fetch: services.postsService.searchOption.fetch, onChange: function (e) { return handleChangePage(e); } }, void 0),
                            jsx(SearchBox, {}, void 0)] }), void 0),
                    jsx(Box, __assign({ mx: 2 }, { children: jsx(Divider, {}, void 0) }), void 0)] }, void 0),
            jsxs(Box, __assign({ display: "flex", flex: "1 1 auto", overflow: "auto", p: 1 }, { children: [((_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.displayFormat) === "card" &&
                        jsx(ItemsWrapGrid, { items: services.postsService.posts.map(function (item) { return ({ id: item.contentId, content: item }); }), itemSlot: function (item) { return jsx(PostCard, { previewPressed: function () { return onPreviewPressed(item.content.contentId); }, deletePresed: function () { return onDeletePresed(item.content); }, editPressed: function () { return onEditPressed(item.content); }, content: item.content }, void 0); } }, void 0),
                    ((_b = services.postManagementsService.selected) === null || _b === void 0 ? void 0 : _b.displayFormat) === "table" &&
                        jsx(PostSearchView, { previewPressed: function (c) { return onPreviewPressed(c.contentId); }, deletePresed: function (c) { return onDeletePresed(c); }, editPressed: function (c) { return onEditPressed(c); }, contents: services.postsService.posts, schemes: (_d = (_c = services.postManagementsService.selected) === null || _c === void 0 ? void 0 : _c.taxonomy.schemes) !== null && _d !== void 0 ? _d : [] }, void 0)] }), void 0)] }), void 0));
});
function PostSearchView(props) {
    var theme = useTheme();
    return (jsx(TableContainer, { children: jsxs(Table, __assign({ stickyHeader: true, "aria-label": "sticky table" }, { children: [jsx(TableHead, { children: jsxs(TableRow, { children: [jsx(TableCell, {}, void 0),
                            jsx(TableCell, { children: "\u30BF\u30A4\u30C8\u30EB" }, void 0),
                            jsx(TableCell, { children: "\u4F5C\u6210\u8005" }, void 0),
                            jsx(TableCell, { children: "\u30B5\u30E0\u30CD\u30A4\u30EB" }, void 0),
                            jsx(TableCell, { children: "\u30E1\u30BF\u30C7\u30FC\u30BF" }, void 0),
                            jsx(TableCell, { children: "\u5099\u8003" }, void 0),
                            jsx(TableCell, { children: "\u516C\u958B\u65E5\u6642" }, void 0),
                            jsx(TableCell, { children: "\u30B9\u30C6\u30FC\u30BF\u30B9" }, void 0),
                            jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u5099\u8003" }), void 0),
                            jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u8A73\u7D30" }), void 0),
                            props.schemes.map(function (s) { return jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: s.displayName }), s.schemeId); }),
                            jsx(TableCell, { style: { textAlign: "center" } }, void 0)] }, void 0) }, void 0),
                jsx(TableBody, { children: props.contents.map(function (c) {
                        var _a;
                        return (jsxs(TableRow, { children: [jsx(TableCell, __assign({ padding: "checkbox" }, { children: jsx(Checkbox, { color: "primary" }, void 0) }), void 0),
                                jsx(TableCell, { children: c.title }, void 0),
                                jsx(TableCell, { children: jsxs(Box, __assign({ display: "flex" }, { children: [jsx(Avatar, __assign({ src: axios.defaults.baseURL + services.authService.loginInfo.avatar, style: {
                                                    width: "32px",
                                                    height: "32px",
                                                    background: theme.palette.primary.main
                                                } }, { children: c.createdBy.name[0] }), void 0),
                                            jsx(Typography, __assign({ variant: "h6", noWrap: true }, { children: c.createdBy.name }), void 0)] }), void 0) }, void 0),
                                jsx(TableCell, { children: jsx("img", { alt: c.title, src: c.thumbnail, height: "38px", style: {
                                            objectFit: "cover",
                                            background: "rgba(127, 127, 127, 0.1"
                                        } }, void 0) }, void 0),
                                jsx(TableCell, { children: c.metadata }, void 0),
                                jsx(TableCell, { children: c.description }, void 0),
                                jsx(TableCell, { children: jsx(DateTimeText, { showTime: true, color: "textSecondary", fontSize: "12px", date: ((_a = c.publishIn) !== null && _a !== void 0 ? _a : c.createdAt).toJSDate() }, void 0) }, void 0),
                                jsx(TableCell, { children: jsx(Typography, __assign({ variant: "caption" }, { children: postStatusTypeDisplay[c.status] }), void 0) }, void 0),
                                c.fields.map(function (f) { return jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: f.value }), f.fieldId); }),
                                jsx(TableCell, { children: jsxs(Box, __assign({ display: "flex" }, { children: [jsx(IconButton, { children: jsx(Icon, { children: "preview" }, void 0) }, void 0),
                                            jsx(IconButton, { children: jsx(Icon, { children: "edit" }, void 0) }, void 0),
                                            jsx(IconButton, { children: jsx(Icon, { children: "delete" }, void 0) }, void 0)] }), void 0) }, void 0)] }, c.contentId));
                    }) }, void 0)] }), void 0) }, void 0));
}

/**
 * select media or upload Dialog.
 * @param props props
 */
function ConfirmPostTypeDialog(props) {
    var _a = __read(useState(false), 2), confirm = _a[0], setConfirm = _a[1];
    return (jsxs(Box, __assign({ p: 2 }, { children: [jsx(Box, { children: jsx(Typography, __assign({ variant: "h6" }, { children: props.context.message }), void 0) }, void 0),
            jsx(Box, __assign({ mt: 1 }, { children: jsx(Typography, __assign({ variant: "overline", style: { color: theme.palette.grey[500] } }, { children: "\u6295\u7A3F\u30BF\u30A4\u30D7\u3068\u7D10\u3065\u3044\u3066\u3044\u308B\u6295\u7A3F\u304C\u3059\u3079\u3066\u524A\u9664\u3055\u308C\u307E\u3059\u304C\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F" }), void 0) }), void 0),
            jsxs(Box, { children: [jsx(Checkbox, { checked: confirm, onChange: function (e) { return setConfirm(e.target.checked); } }, void 0), "\u78BA\u8A8D\u3057\u307E\u3057\u305F"] }, void 0),
            jsxs(Box, __assign({ marginTop: "24px", display: "flex" }, { children: [jsx(Button, __assign({ variant: "text", color: "primary", style: { marginLeft: "auto" }, onClick: function () { return props.onClose(false); } }, { children: "Cancel" }), void 0),
                    jsx(Button, __assign({ disabled: !confirm, variant: "contained", style: { marginLeft: "12px" }, onClick: function () { return props.onClose(true); }, color: "primary" }, { children: "Ok" }), void 0)] }), void 0)] }), void 0));
}
function confirmDeletePostTypeAsync(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(ConfirmPostTypeDialog, { message: message }, {
                        maxWidth: "lg"
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function PostsPage() {
    var _this = this;
    var classes = useStyles$4();
    var routeMatch = useRouteMatch();
    var history = useHistory();
    var _a = __read(useState(false), 2), postTypeAnimation = _a[0], setPostTypeAnimation = _a[1];
    var _b = __read(React.useState(null), 2), anchorEl = _b[0], setAnchorEl = _b[1];
    var _c = __read(useState(null), 2), postTypeContext = _c[0], setPostTypeContext = _c[1];
    useEffect(function () {
        services.postManagementsService.fetchPostTypes().then(function () {
            var selected = services.postManagementsService.selected;
            if (selected) {
                if (!routeMatch.params.taxonomy) {
                    history.replace("/posts/" + selected.taxonomy.name);
                }
                else {
                    services.postManagementsService.selectFromName(routeMatch.params.taxonomy);
                    setPostTypeAnimation(true);
                }
            }
        });
    }, [history, routeMatch]);
    var handleNewPost = function () {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/new/edit");
        }
    };
    var onAddPostTypeClicked = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            history.push("/posts/new/edit");
            return [2 /*return*/];
        });
    }); };
    function onEditClicked() {
        if (postTypeContext) {
            history.push("/posts/" + postTypeContext.taxonomy.name + "/edit");
        }
    }
    var onPostTypeListClicked = function (index) {
        services.postManagementsService.selectFromIndex(index);
        var selected = services.postManagementsService.selected;
        if (selected) {
            setPostTypeAnimation(false);
            setTimeout(function () { return history.replace("/posts/" + selected.taxonomy.name); }, 10);
        }
        console.log(selected);
    };
    var onPostTypeMenu = function (event, postType) {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setPostTypeContext(postType);
    };
    var onRemovePostTypeClicked = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handleCloseMenu();
                    if (!postTypeContext) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, confirmDeletePostTypeAsync(postTypeContext.taxonomy.displayName + "\u3092\u672C\u5F53\u306B\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F")];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.postManagementsService.removeAsync(postTypeContext.postTypeId)];
                case 2:
                    _a.sent();
                    console.log(services.postManagementsService.postTypes);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleCloseMenu = function () {
        setAnchorEl(null);
    };
    return jsx(ObserverComponent, { children: (function () {
            var postManagementsService = services.postManagementsService, authService = services.authService;
            if (!authService.loginInfo.identifier) {
                return (jsx(Box, __assign({ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }, { children: jsx(Typography, __assign({ variant: "h5", style: { color: theme.palette.error.main } }, { children: "WEB\u30B5\u30A4\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), void 0) }), void 0));
            }
            return (jsxs(Box, __assign({ height: "100%", display: "flex" }, { children: [jsxs(Box, __assign({ p: 0, width: "200px", minWidth: "200px", maxWidth: "200px", overflow: "auto" }, { children: [jsxs(Button, __assign({ disabled: !(authService.loginInfo.role >= RoleType.Edit), onClick: onAddPostTypeClicked, color: "primary", variant: "contained", style: {
                                    borderRadius: "18px",
                                    margin: "8px", marginTop: "16px"
                                } }, { children: [jsx(Icon, { children: "add" }, void 0), "\u6295\u7A3F\u30BF\u30A4\u30D7\u3092\u8FFD\u52A0"] }), void 0),
                            jsx(List, __assign({ component: "nav", className: classes.postTypeBar, "aria-label": "contacts" }, { children: postManagementsService.postTypes.map(function (t, i) {
                                    var _a;
                                    return (jsxs(ListItem, __assign({ button: true, className: ((_a = postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.name) === t.taxonomy.name ? classes.activeItem : "", onClick: function () { return onPostTypeListClicked(i); } }, { children: [jsx(ListItemText, { primary: t.taxonomy.displayName }, void 0),
                                            authService.loginInfo.role >= RoleType.Edit && (jsx(IconButton, __assign({ size: "small", onClick: function (e) { return onPostTypeMenu(e, t); } }, { children: jsx(MoreVert, {}, void 0) }), void 0))] }), t.taxonomy.name));
                                }) }), void 0),
                            jsxs(Menu, __assign({ id: "long-menu", anchorEl: anchorEl, keepMounted: true, open: !!anchorEl, onClose: handleCloseMenu, PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: "20ch",
                                    },
                                } }, { children: [jsx(MenuItem, __assign({ onClick: function () { return onEditClicked(); } }, { children: "\u7DE8\u96C6" }), void 0),
                                    jsx(Divider, {}, void 0),
                                    jsx(MenuItem, __assign({ onClick: onRemovePostTypeClicked }, { children: "\u524A\u9664" }), void 0)] }), void 0)] }), void 0),
                    jsx(Divider, { orientation: "vertical" }, void 0),
                    jsx(Slide, __assign({ direction: "up", timeout: {
                            enter: 180,
                            exit: 50
                        }, in: postTypeAnimation }, { children: jsxs(Box, __assign({ flex: "1 1 auto", position: "relative", overflow: "hidden", height: "100%" }, { children: [jsx(PostListPanel, {}, void 0),
                                jsx(Fab, __assign({ disabled: !services.postManagementsService.selected || !(authService.loginInfo.role >= RoleType.Post), style: {
                                        position: "absolute",
                                        zIndex: 9999,
                                        right: "24px",
                                        bottom: "24px"
                                    }, onClick: function () { return handleNewPost(); }, color: "primary" }, { children: jsx(Add, {}, void 0) }), void 0)] }), void 0) }), void 0),
                    jsx(Divider, { orientation: "vertical" }, void 0),
                    jsx(Box, __assign({ minWidth: "220px", maxWidth: "220px", height: "100%", overflow: "auto" }, { children: services.postManagementsService.selected &&
                            jsx(PostTypeSettingPanel, { postType: services.postManagementsService.selected }, void 0) }), void 0)] }), void 0));
        }) }, void 0);
}
var useStyles$4 = makeStyles({
    postTypeBar: {
        width: "100%",
        flex: "1 1 auto",
    },
    container: {
        height: "100%"
    },
    activeItem: {
        background: theme.palette.primary.main + "!important",
    }
});

export default PostsPage;
