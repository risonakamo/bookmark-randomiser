import {createRoot} from "react-dom/client";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {getRealBookmarkItems} from "lib/bookmark";

import FolderBackButton from "components/folder-back-button/folder-back-button";
import StaticToastBar from "components/static-toast-bar/static-toast-bar";
import AmountSelector from "components/amount-selector/amount-selector";
import GenerateButton from "components/generate-button/generate-button";
import FatButton from "components/fat-button/fat-button";
import BookmarkItem from "components/bookmark-item/bookmark-item";

import "./bookmark-generate-index.less";

export default function BookmarkGenerateIndex():JSX.Element
{
  // STATES
  // the current bookmarks being displayed
  const [bookmarks,setBookmarks]=useImmer<RealBookmarkItem[]>([]);


  // EFFECTS
  // retrieve and set bookmark items from query url
  useEffect(()=>{
    (async ()=>{
      setBookmarks(await getRealBookmarkItems("4093"));
    })();
  },[]);


  // RENDER
  function render_bookmarkitems():JSX.Element[]
  {
    return _.map(bookmarks,(bookmark:RealBookmarkItem,i:number):JSX.Element=>{
      return <BookmarkItem bookmark={bookmark} key={bookmark.id} index={i+1}/>;
    });
  }

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
      {render_bookmarkitems()}
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<BookmarkGenerateIndex/>);
}

window.onload=main;