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
  const [currentPath,setCurrentPath]=useImmer<BookmarkPath>([]);


  // DERIVED STATES
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


  // RENDER
  /** render folder items */
  function render_folderItems():JSX.Element[]
  {
    return _.map(bookmarkItems,(item:BookmarkItem):JSX.Element=>{
      var mode:FolderMode="normal";
      if (!item.items)
      {
        mode="disabled";
      }

      return <FolderItem name={item.title} items={item.items} mode={mode} id={item.id} key={item.id}
        onClick={h_folderItemClicked} dirs={item.dirs}/>
    });
  }

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