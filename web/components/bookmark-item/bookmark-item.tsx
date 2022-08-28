import cx,{Mapping} from "classnames";

import {getFaviconUrl} from "lib/favicon";

import "./bookmark-item.less";

interface BookmarkItemProps
{
  opened?:boolean
  starred?:boolean
}

export default function BookmarkItem(props:BookmarkItemProps):JSX.Element
{
  // temp
  const url:string=getFaviconUrl("http://www.pixiv.net/member_illust.php?id=5936045");

  const topCx:Mapping={
    opened:props.opened
  };

  const starZoneCx:Mapping={
    starred:props.starred
  };

  return <div className={cx("bookmark-item",topCx)}>
    <div className="gen-number">
      101
    </div>
    <div className={cx("star-zone",starZoneCx)}>
      <img src="/build/imgs/bookmark-star.png"/>
    </div>
    <div className="icon-zone">
      <img src={url}/>
    </div>
    <div className="title-zone">
      アズールレーン公式 on Twitter: "【艦船紹介】 空母　リトル・イラストリアス 「愛と平和をこの海に、聖なる光をあなたに――ですね！指揮官さま♪」 中国配信版こどもの日記念艦船、 次回
    </div>
  </div>;
}