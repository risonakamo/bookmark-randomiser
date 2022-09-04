import _ from "lodash";

import ToastItem from "components/toast-item/toast-item";
import ToastArrow from "components/toast-arrow/toast-arrow";

import "./toast-bar.less";

interface ToastBarProps
{
  path:BookmarkPath

  onItemClick?(path:BookmarkPath):void
}

export default function ToastBar(props:ToastBarProps):JSX.Element
{
  /** clicked the root toast item. return an empty path */
  function h_rootItemClick():void
  {
    props.onItemClick?.([]);
  }

  /** render the items in the path */
  function r_toastItems():JSX.Element[]
  {
    const partialPath:BookmarkPath=[];

    return _.flatMap(props.path,(pathitem:string):JSX.Element=>{
      // add the current item to the partial path. save a copy of the partial path to represent the
      // path that should be returned if this item is to be clicked
      partialPath.push(pathitem);
      const partialPathForThisItem:BookmarkPath=[...partialPath];

      /** toast item was clicked. return the path up until the target item */
      function h_itemClick():void
      {
        props.onItemClick?.(partialPathForThisItem);
      }

      return <>
        <ToastArrow key={`${pathitem}_arrow`}/>
        <ToastItem toastText={pathitem} key={pathitem} onClick={h_itemClick}/>
      </>;
    });
  }

  return <div className="toast-bar">
    <ToastItem toastText="/" onClick={h_rootItemClick}/>
    {r_toastItems()}
  </div>;
}