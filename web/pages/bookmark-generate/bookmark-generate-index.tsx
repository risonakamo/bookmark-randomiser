import {createRoot} from "react-dom/client";

import FolderBackButton from "components/folder-back-button/folder-back-button";
import StaticToastBar from "components/static-toast-bar/static-toast-bar";
import AmountSelector from "components/amount-selector/amount-selector";
import GenerateButton from "components/generate-button/generate-button";
import FatButton from "components/fat-button/fat-button";

import "./bookmark-generate-index.less";

export default function BookmarkGenerateIndex():JSX.Element
{
  const testpath:string[]=[
    "folder1",
    "asdads",
    "asdadasdasda"
  ];

  return <>
    <div className="control-header">
      <FolderBackButton/>
      <StaticToastBar path={testpath}/>
      <AmountSelector/>
    </div>
    <div className="control-buttons">
      <GenerateButton itemCount={52}/>
      <FatButton text="OPEN"/>
    </div>
    <div className="items-zone">

    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<BookmarkGenerateIndex/>);
}

window.onload=main;