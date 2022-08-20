import cx,{Mapping} from "classnames";

import "./folder-item.less";

type FolderMode="normal"|"recent"|"disabled"

interface FolderItemProps
{
  name:string
  items:number
  mode?:FolderMode
}

export default function FolderItem(props:FolderItemProps):JSX.Element
{
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
    <div className="icon-zone" title={iconZoneTooltip}>
      <div className="folder-icon"></div>
    </div>
    <div className="label">
      <h2 title={props.name}>{props.name}</h2>
      <p>{props.items} items</p>
    </div>
  </div>;
}