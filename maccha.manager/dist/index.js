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

export { aX as MacchaManager } from './index-ae1e2277.js';
import 'react/jsx-runtime';
import 'react';
import 'react-dom';
