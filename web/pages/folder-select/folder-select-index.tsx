import {createRoot} from "react-dom/client";

import ToastBar from "components/toast-bar/toast-bar";
import FolderItem from "components/folder-item/folder-item";

import "./folder-select-index.less";

function FolderSelectMain():JSX.Element
{
  return <>
    <div className="back-button">
      <img src="/build/imgs/big-back-button.png"/>
    </div>
    <div className="folder-zone">
      <div className="title-zone">

      </div>
      <div className="toast-zone">
        <ToastBar/>
      </div>
      <div className="item-zone">
        {/* <FolderItem/> */}
      </div>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<FolderSelectMain/>);
}

window.onload=main;