import {createRoot} from "react-dom/client";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {getRealBookmarkItems} from "lib/bookmark";
import {randomPull} from "lib/random-gen";

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
  // all the available bookmarks to randomise from
  const [availableBookmarks,setAvailableBookmarks]=useImmer<RealBookmarkItem[]>([]);

  // the bookmarks currently being displayed
  const [displayedBookmarks,setDisplayedBookmarks]=useImmer<RealBookmarkItem[]>([]);


  // EFFECTS
  // retrieve available bookmarks from target query url. perform initial random pull
  useEffect(()=>{
    (async ()=>{
      const availBookmarks:RealBookmarkItem[]=await getRealBookmarkItems("11617");
      const pullResult:RandomGenResult<RealBookmarkItem>=randomPull<RealBookmarkItem>(availBookmarks,10);

      setAvailableBookmarks(pullResult.modifiedSource);
      setDisplayedBookmarks(pullResult.pullResult);
    })();
  },[]);


  // RENDER
  function render_bookmarkitems():JSX.Element[]
  {
    return _.map(displayedBookmarks,(bookmark:RealBookmarkItem,i:number):JSX.Element=>{
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