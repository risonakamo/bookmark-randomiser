import React from "react";
import {createRoot} from "react-dom/client";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  return <>
    popup
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<PopupMain/>);
}

window.onload=main;