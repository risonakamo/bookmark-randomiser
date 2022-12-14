import {createRoot} from "react-dom/client";
import {useEffect,useMemo} from "react";
import {useImmer} from "use-immer";
import _ from "lodash";

import {getRealBookmarkItems,bookmarkIdToPath} from "lib/bookmark";
import {randomPull} from "lib/random-gen";
import {getTargetFolderId} from "apis/url-query";

import FolderBackButton from "components/folder-back-button/folder-back-button";
import StaticToastBar from "components/static-toast-bar/static-toast-bar";
import AmountSelector from "components/amount-selector/amount-selector";
import GenerateButton from "components/generate-button/generate-button";
import FatButton,{ButtonMode} from "components/fat-button/fat-button";
import BookmarkItem from "components/bookmark-item/bookmark-item";

import "./bookmark-generate-index.less";

const DEFAULT_GEN_AMOUNT:number=10;

interface RealBookmarkItem2 extends RealBookmarkItem
{
  opened:boolean
}

export default function BookmarkGenerateIndex():JSX.Element
{
  // STATES
  // all the available bookmarks to randomise from
  const [availableBookmarks,setAvailableBookmarks]=useImmer<RealBookmarkItem2[]>([]);

  // the bookmarks currently being displayed
  const [displayedBookmarks,setDisplayedBookmarks]=useImmer<RealBookmarkItem2[]>([]);

  // number used to determine index numbers next to displayed bookmark items
  const [generateIndex,setGenerateIndex]=useImmer<number>(1);

  // generate amount
  const [generateAmount,setGenerateAmount]=useImmer<number>(DEFAULT_GEN_AMOUNT);

  // bookmark path
  const [currentPath,setCurrentPath]=useImmer<BookmarkPath>([]);


  // DERIVED STATES
  // true if all items are opened
  const allOpened:boolean=useMemo(()=>{
    return _.every(displayedBookmarks,(item:RealBookmarkItem2):boolean=>{
      return item.opened;
    });
  },[displayedBookmarks]);


  // EFFECTS
  // retrieve available bookmarks from target query url. perform initial random pull. also retrieve the
  // current bookmark path from the id input
  useEffect(()=>{
    (async ()=>{
      const targetFolder:string|null=getTargetFolderId();

      if (!targetFolder)
      {
        console.error("failed to get target folder id from url params");
        return;
      }

      const availBookmarks:RealBookmarkItem2[]=upgradeRealBookmarkItems(
        await getRealBookmarkItems(targetFolder)
      );

      const pullResult:RandomGenResult<RealBookmarkItem2>=randomPull<RealBookmarkItem2>(
        availBookmarks,DEFAULT_GEN_AMOUNT
      );

      setCurrentPath(await bookmarkIdToPath(targetFolder));
      setAvailableBookmarks(pullResult.modifiedSource);
      setDisplayedBookmarks(pullResult.pullResult);
    })();
  },[]);


  // STATE CONTROL
  /** mark the selected item in the displayed bookmarks list as opened */
  function markItemOpened(item:RealBookmarkItem):void
  {
    setDisplayedBookmarks((draft:RealBookmarkItem2[])=>{
      for (var i=0;i<draft.length;i++)
      {
        const displayedItem:RealBookmarkItem2=draft[i];

        if (displayedItem.id==item.id)
        {
          displayedItem.opened=true;
          return;
        }
      }

      console.warn("markItemOpened: failed to find target item\n",
        "target item:",item);
    });
  }

  /** mark all displayed bookmark items as opened */
  function markAllOpened():void
  {
    setDisplayedBookmarks(_.map(displayedBookmarks,(item:RealBookmarkItem2):RealBookmarkItem2=>{
      return {
        ...item,
        opened:true
      };
    }));
  }


  // HANDLERS
  /** handle amount selector change */
  function h_genamountchange(value:number):void
  {
    setGenerateAmount(value);
  }

  /** clicked generate button. pull from the available bookmarks, set the newly generated bookmarks,
   *  and update the gen index */
  function h_generateButtonClick():void
  {
    const pullResult:RandomGenResult<RealBookmarkItem2>=randomPull<RealBookmarkItem2>(
      availableBookmarks,generateAmount
    );

    setAvailableBookmarks(pullResult.modifiedSource);
    setDisplayedBookmarks(pullResult.pullResult);
    setGenerateIndex(generateIndex+generateAmount);
  }

  /** clicked bookmark item. open the url in new tab, and mark the item as opened, if it was not already
   *  opened */
  function h_bookmarkItemClick(item:RealBookmarkItem,opened:boolean):void
  {
    chrome.tabs.create({
      url:item.url,
      active:false
    });

    if (!opened)
    {
      markItemOpened(item);
    }
  }

  /** clicked open all button. open all displayed items in new tab then mark all items as displayed */
  function h_openallClick():void
  {
    for (var i=0;i<displayedBookmarks.length;i++)
    {
      const item:RealBookmarkItem2=displayedBookmarks[i];

      chrome.tabs.create({
        url:item.url,
        active:false
      });
    }

    markAllOpened();
  }


  // RENDER
  function render_bookmarkitems():JSX.Element[]
  {
    return _.map(displayedBookmarks,(bookmark:RealBookmarkItem2,i:number):JSX.Element=>{
      return <BookmarkItem bookmark={bookmark} key={bookmark.id} index={generateIndex+i}
        opened={bookmark.opened} onClick={h_bookmarkItemClick}/>;
    });
  }

  // compute open button values
  var openButtonMode:ButtonMode="normal";
  var openButtonText:string="OPEN";
  var openButtonHoverText:string|undefined=undefined;
  var openButtonHoverMode:ButtonMode|undefined=undefined;

  if (allOpened)
  {
    openButtonMode="opened";
    openButtonText="OPENED";
    openButtonHoverText="OPEN AGAIN";
    openButtonHoverMode="open-again";
  }

  return <>
    <div className="control-header">
      <FolderBackButton/>
      <StaticToastBar path={currentPath}/>
      <AmountSelector amount={generateAmount} onChange={h_genamountchange}/>
    </div>
    <div className="control-buttons">
      <GenerateButton itemCount={availableBookmarks.length} onClick={h_generateButtonClick}/>
      <FatButton text={openButtonText} onClick={h_openallClick} mode={openButtonMode}
        hoverText={openButtonHoverText} hoverMode={openButtonHoverMode}/>
    </div>
    <div className="items-zone">
      {render_bookmarkitems()}
    </div>
  </>;
}

/** upgrade real bookmark items array into bookmark items2 */
function upgradeRealBookmarkItems(items:RealBookmarkItem[]):RealBookmarkItem2[]
{
  return _.map(items,(item:RealBookmarkItem):RealBookmarkItem2=>{
    return {
      ...item,
      opened:false
    };
  });
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<BookmarkGenerateIndex/>);
}

window.onload=main;