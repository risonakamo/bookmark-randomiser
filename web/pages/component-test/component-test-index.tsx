import {createRoot} from "react-dom/client";

import FolderItem from "components/folder-item/folder-item";
import FatButton from "components/fat-button/fat-button";
import FolderBackButton from "components/folder-back-button/folder-back-button";

import "./component-test-index.less";

export default function ComponentTestIndex():JSX.Element
{
  return <>
    <h1>folder items</h1>
    <div className="folder-items">
      <FolderItem name="folder 1" items={120}/>
      <FolderItem name="folder 2" items={12}/>
      <FolderItem name="folder that has really long name that has to be longer than this" items={2}/>
      <FolderItem name="recent folder" items={12} mode="recent"/>
      <FolderItem name="disabled folder" items={0} mode="disabled"/>
    </div>

    <h1>big button</h1>
    <div className="big-buttons">
      <FatButton text="GENERATE"/>
      <FatButton text="OPEN"/>
      <FatButton mode="disabled" text="NO ITEMS"/>
      <FatButton mode="opened" text="OPENED" hoverText="OPEN AGAIN" hoverMode="open-again"/>
    </div>

    <h1>folder back button</h1>
    <div>
      <FolderBackButton/>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<ComponentTestIndex/>);
}

window.onload=main;