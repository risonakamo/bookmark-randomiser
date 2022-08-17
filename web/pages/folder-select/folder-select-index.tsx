import React from "react";
import {createRoot} from "react-dom/client";

import "./folder-select-index.less";

function FolderSelectMain():JSX.Element
{
  return <>
    folderselect
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<FolderSelectMain/>);
}

window.onload=main;