import cx,{Mapping} from "classnames";

import "./folder-item.less";

export type FolderMode="normal"|"recent"|"disabled"

interface FolderItemProps
{
  name:string
  id:string
  dirs:number
  items:number
  mode?:FolderMode

  onClick?(title:string):void
  onIconClick?(id:string):void
}

export default function FolderItem(props:FolderItemProps):JSX.Element
{
  /** folder item label clicked. return the title of the folder */
  function h_click():void
  {
    props.onClick?.(props.name);
  }

  /** icon zone was clicked. return the id of the folder */
  function h_iconClick():void
  {
    props.onIconClick?.(props.id);
  }

  // determine top class
  const foldermode:FolderMode=props.mode || "normal";

  const topCx:Mapping={
    normal:foldermode=="normal",
    recent:foldermode=="recent",
    disabled:foldermode=="disabled"
  };

  // determine folder icon zone tooltip
  var iconZoneTooltip:string="Begin Randomise";
  if (foldermode=="disabled")
  {
    iconZoneTooltip="No Items to Randomise";
  }

  return <div className={cx("folder-item",topCx)}>
    <div className="icon-zone" title={iconZoneTooltip} onClick={h_iconClick}>
      <div className="folder-icon"></div>
    </div>
    <div className="label" onClick={h_click}>
      <h2 title={props.name}>{props.name}</h2>
      <p>{props.dirs} dirs, {props.items} items</p>
    </div>
  </div>;
}