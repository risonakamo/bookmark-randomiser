import {createRoot} from "react-dom/client";

import FolderItem from "components/folder-item/folder-item";
import FatButton from "components/fat-button/fat-button";
import FolderBackButton from "components/folder-back-button/folder-back-button";
import StaticToastBar from "components/static-toast-bar/static-toast-bar";
import AmountSelector from "components/amount-selector/amount-selector";
import GenerateButton from "components/generate-button/generate-button";

import "./component-test-index.less";

export default function ComponentTestIndex():JSX.Element
{
  const path1:string[]=[
    "folder1",
    "folder2",
    "folder3"
  ];

  const exampleBookmarkItems:BookmarkItem[]=[
    {
      title:"folder 1",
      id:"a",
      dirs:2,
      items:120
    },
    {
      title:"folder 2",
      id:"a",
      items:12,
      dirs:4
    },
    {
      title:"folder that has really long name that has to be longer than this",
      id:"a",
      items:2,
      dirs:60
    },
    {
      title:"recent folder",
      id:"a",
      items:12,
      dirs:0
    },
    {
      title:"disabled folder",
      id:"a",
      items:0,
      dirs:0
    },
  ];

  return <>
    <h1>folder items</h1>
    <div className="folder-items">
      <FolderItem item={exampleBookmarkItems[0]}/>
      <FolderItem item={exampleBookmarkItems[1]}/>
      <FolderItem item={exampleBookmarkItems[2]}/>
      <FolderItem item={exampleBookmarkItems[3]} recent={true}/>
      <FolderItem item={exampleBookmarkItems[4]}/>
    </div>

    <h1>big button</h1>
    <div className="big-buttons">
      <GenerateButton itemCount={52}/>
      <GenerateButton itemCount={0}/>
      <FatButton text="OPEN"/>
      <FatButton mode="opened" text="OPENED" hoverText="OPEN AGAIN" hoverMode="open-again"/>
    </div>

    <h1>folder back button</h1>
    <div>
      <FolderBackButton/>
    </div>

    <h1>static toast bar</h1>
    <div>
      <StaticToastBar path={path1}/>
    </div>

    <h1>amount selector</h1>
    <div>
      <AmountSelector/>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<ComponentTestIndex/>);
}

window.onload=main;