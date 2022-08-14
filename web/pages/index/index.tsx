import React from "react";
import {createRoot} from "react-dom/client";

import TestThing from "components/test-thing/test-thing";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    hello

    <div className="thing">
      asdasd
    </div>

    <TestThing/>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<IndexMain/>);
}

window.onload=main;