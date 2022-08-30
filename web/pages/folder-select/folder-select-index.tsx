import {createRoot} from "react-dom/client";

import {bookmarklibtest} from "lib/bookmark";

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
        <h1>FOLDER SELECT</h1>
      </div>
      <div className="toast-zone">
        <ToastBar/>
      </div>
      <div className="item-zone">
        <FolderItem name="folder 1" items={120}/>
        <FolderItem name="folder 2" items={12}/>
        <FolderItem name="folder that has really long name that has to be longer than this" items={2}/>
        <FolderItem name="recent folder" items={12} mode="recent"/>
        <FolderItem name="disabled folder" items={0} mode="disabled"/>
      </div>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<FolderSelectMain/>);
  bookmarklibtest();
}

window.onload=main;