import cx,{Mapping} from "classnames";

import "./folder-item.less";

export type FolderMode="normal"|"recent"|"disabled"

interface FolderItemProps
{
  item:BookmarkItem
  recent?:boolean

  onClick?(title:string):void
  onIconClick?(id:string):void
}

export default function FolderItem(props:FolderItemProps):JSX.Element
{
  // HANDLERS
  /** folder item label clicked. return the title of the folder. does nothing if the item has no
   * dirs */
  function h_click():void
  {
    if (!props.item.dirs)
    {
      return;
    }

    props.onClick?.(props.item.title);
  }

  /** icon zone was clicked. return the id of the folder. does nothing if the bookmark item has no
   * items */
  function h_iconClick():void
  {
    if (!props.item.items)
    {
      return;
    }

    props.onIconClick?.(props.item.id);
  }


  // RENDER
  // determine top class
  var foldermode:FolderMode="normal";

  if (!props.item.items)
  {
    foldermode="disabled";
  }

  if (props.recent)
  {
    foldermode="recent";
  }

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

  // determine various labels classes
  const dirsCx:Mapping={
    disabled:!props.item.dirs
  };

  const itemCountLabelCx:Mapping={
    disabled:!props.item.items
  };

  const folderTitleCx:Mapping={
    disabled:!props.item.dirs
  };

  return <div className={cx("folder-item",topCx)}>
    <div className="icon-zone" title={iconZoneTooltip} onClick={h_iconClick}>
      <div className="folder-icon"></div>
    </div>
    <div className="label" onClick={h_click}>
      <h2 title={props.item.title} className={cx(folderTitleCx)}>{props.item.title}</h2>
      <p>
        <span className={cx(dirsCx)}>{props.item.dirs} dirs,</span>
        &nbsp;<span className={cx(itemCountLabelCx)}>{props.item.items} items</span>
      </p>
    </div>
  </div>;
}