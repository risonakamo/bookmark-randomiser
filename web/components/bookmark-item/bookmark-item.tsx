import cx,{Mapping} from "classnames";

import {getFaviconUrl} from "lib/favicon";

import "./bookmark-item.less";

interface BookmarkItemProps
{
  bookmark:RealBookmarkItem
  index:number

  opened?:boolean
  starred?:boolean

  onClick?(item:RealBookmarkItem,opened:boolean):void
}

export default function BookmarkItem(props:BookmarkItemProps):JSX.Element
{
  // HANDLERS
  /** clicked this item. return the bookmark data of this item, and if it was opened or not */
  function h_click():void
  {
    props.onClick?.(props.bookmark,!!props.opened);
  }


  // RENDER
  const topCx:Mapping={
    opened:props.opened
  };

  const starZoneCx:Mapping={
    starred:props.starred
  };

  const iconUrl:string=getFaviconUrl(props.bookmark.url);

  return <div className={cx("bookmark-item",topCx)} onClick={h_click}>
    <div className="gen-number">
      {props.index}
    </div>
    <div className={cx("star-zone",starZoneCx)}>
      <img src="/build/imgs/bookmark-star.png"/>
    </div>
    <div className="link-zone">
      <div className="icon-zone">
        <img src={iconUrl}/>
      </div>
      <div className="title-zone" title={props.bookmark.title}>
        {props.bookmark.title}
      </div>
    </div>
  </div>;
}