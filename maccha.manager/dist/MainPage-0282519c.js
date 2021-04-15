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

function MainPage() {
    return (jsx("div", { children: "Maccha Main" }, void 0));
}

export default MainPage;
