import {getFaviconUrl} from "lib/favicon";

import "./bookmark-item.less";

interface BookmarkItemProps
{

}

export default function BookmarkItem(props:BookmarkItemProps):JSX.Element
{
  const url:string=getFaviconUrl("http://www.pixiv.net/member_illust.php?id=5936045");

  return <div className="bookmark-item">
    <div className="gen-number">
      101
    </div>
    <div className="star-zone">

    </div>
    <div className="icon-zone">
      <img src={url}/>
    </div>
    <div className="title-zone">
      「Y-K」 's Works - Illustration [pixiv]
    </div>
  </div>;
}