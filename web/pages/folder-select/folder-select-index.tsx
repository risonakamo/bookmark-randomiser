import {useMemo,useEffect} from "react";
import {createRoot} from "react-dom/client";
import {useImmer} from "use-immer";
import _ from "lodash";

import {getChildItems} from "lib/bookmark";

import ToastBar from "components/toast-bar/toast-bar";
import FolderItem,{FolderMode} from "components/folder-item/folder-item";

import "./folder-select-index.less";

function FolderSelectMain():JSX.Element
{
  // STATES
  // the current bookmark path
  const [currentPath,setCurrentPath]=useImmer<BookmarkPath>([]);


  // DERIVED STATES
  // the bookmark items being displayed
  const [bookmarkItems,setBookmarkItems]=useImmer<BookmarkItem[]>([]);


  // EFFECTS
  // retrieve and set bookmark items when current path changes
  useEffect(()=>{
    (async ()=>{
      setBookmarkItems(await getChildItems(currentPath) || []);
    })();
  },[currentPath]);


  // HANDLERS
  /** folder item label zone clicked. navigate into that folder by adding to the current path */
  function h_folderItemClicked(title:string):void
  {
    setCurrentPath((draft:BookmarkPath)=>{
      draft.push(title);
    });
  }

  /** clicked back button. move backwards from the current path */
  function h_backbutton():void
  {
    setCurrentPath((draft:BookmarkPath)=>{
      draft.pop();
    });
  }

  /** clicked on a toast item. force path to be the clicked on item */
  function h_toastItemClick(newpath:BookmarkPath):void
  {
    setCurrentPath(newpath);
  }


  // RENDER
  /** render folder items */
  function render_folderItems():JSX.Element[]
  {
    return _.map(bookmarkItems,(item:BookmarkItem):JSX.Element=>{
      return <FolderItem item={item} key={item.id} onClick={h_folderItemClicked}/>
    });
  }

  return <>
    <div className="back-button" onClick={h_backbutton}>
      <img src="/build/imgs/big-back-button.png"/>
    </div>
    <div className="folder-zone">
      <div className="title-zone">
        <h1>FOLDER SELECT</h1>
      </div>
      <div className="toast-zone">
        <ToastBar path={currentPath} onItemClick={h_toastItemClick}/>
      </div>
      <div className="item-zone">
        {render_folderItems()}
      </div>
    </div>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<FolderSelectMain/>);
}

window.onload=main;