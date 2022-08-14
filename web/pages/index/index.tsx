import React from "react";
import {createRoot} from "react-dom/client";

import "./index.less";

function IndexMain():JSX.Element
{
  return <>
    hello

    <div className="thing">
      asdasd
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<IndexMain/>);
  setTimeout(()=>{
    throw "adad";
  },1000);
}

window.onload=main;