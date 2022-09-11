import {createRoot} from "react-dom/client";
import {useEffect} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {getRealBookmarkItems} from "lib/bookmark";
import {randomPull} from "lib/random-gen";
import {getTargetFolderId} from "apis/url-query";

import FolderBackButton from "components/folder-back-button/folder-back-button";
import StaticToastBar from "components/static-toast-bar/static-toast-bar";
import AmountSelector from "components/amount-selector/amount-selector";
import GenerateButton from "components/generate-button/generate-button";
import FatButton from "components/fat-button/fat-button";
import BookmarkItem from "components/bookmark-item/bookmark-item";

import "./bookmark-generate-index.less";

const DEFAULT_GEN_AMOUNT:number=10;

export default function BookmarkGenerateIndex():JSX.Element
{
  // STATES
  // all the available bookmarks to randomise from
  const [availableBookmarks,setAvailableBookmarks]=useImmer<RealBookmarkItem[]>([]);

  // the bookmarks currently being displayed
  const [displayedBookmarks,setDisplayedBookmarks]=useImmer<RealBookmarkItem[]>([]);

  // number used to determine index numbers next to displayed bookmark items
  const [generateIndex,setGenerateIndex]=useImmer<number>(1);

  // generate amount
  const [generateAmount,setGenerateAmount]=useImmer<number>(DEFAULT_GEN_AMOUNT);


  // EFFECTS
  // retrieve available bookmarks from target query url. perform initial random pull
  useEffect(()=>{
    (async ()=>{
      const targetFolder:string|null=getTargetFolderId();

      if (!targetFolder)
      {
        console.error("failed to get target folder id from url params");
        return;
      }

      const availBookmarks:RealBookmarkItem[]=await getRealBookmarkItems(targetFolder);
      const pullResult:RandomGenResult<RealBookmarkItem>=randomPull<RealBookmarkItem>(
        availBookmarks,DEFAULT_GEN_AMOUNT
      );

      setAvailableBookmarks(pullResult.modifiedSource);
      setDisplayedBookmarks(pullResult.pullResult);
    })();
  },[]);


  // HANDLERS
  /** handle amount selector change */
  function h_genamountchange(value:number):void
  {
    setGenerateAmount(value);
  }

  /** clicked generate button. pull from the available bookmarks, set the newly generated bookmarks,
   *  and update the gen index
   */
  function h_generateButtonClick():void
  {
    const pullResult:RandomGenResult<RealBookmarkItem>=randomPull<RealBookmarkItem>(
      availableBookmarks,generateAmount
    );

    setAvailableBookmarks(pullResult.modifiedSource);
    setDisplayedBookmarks(pullResult.pullResult);
    setGenerateIndex(generateIndex+generateAmount);
  }


  // RENDER
  function render_bookmarkitems():JSX.Element[]
  {
    return _.map(displayedBookmarks,(bookmark:RealBookmarkItem,i:number):JSX.Element=>{
      return <BookmarkItem bookmark={bookmark} key={bookmark.id} index={generateIndex+i}/>;
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
      <AmountSelector amount={generateAmount} onChange={h_genamountchange}/>
    </div>
    <div className="control-buttons">
      <GenerateButton itemCount={availableBookmarks.length} onClick={h_generateButtonClick}/>
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