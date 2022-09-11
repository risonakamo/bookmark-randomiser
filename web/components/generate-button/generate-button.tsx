import cx,{Mapping} from "classnames";

import "./generate-button.less";

import FatButton,{ButtonMode} from "components/fat-button/fat-button";

interface GenerateButtonProps
{
  itemCount:number
  onClick?():void
}

export default function GenerateButton(props:GenerateButtonProps):JSX.Element
{
  // HANDLERS
  /** clicked this button. do nothing if 0 item count */
  function h_click():void
  {
    if (!props.itemCount)
    {
      return;
    }

    props.onClick?.();
  }

  // RENDER
  // compute button mode
  var buttonMode:ButtonMode="normal";
  if (!props.itemCount)
  {
    buttonMode="disabled";
  }

  // compute button text
  var buttonText:string="GENERATE";
  if (!props.itemCount)
  {
    buttonText="NO ITEMS";
  }

  // item number class
  const itemNumberCx:Mapping={
    disabled:buttonMode=="disabled"
  };

  return <div className="generate-button" onClick={h_click}>
    <FatButton text={buttonText} mode={buttonMode} className="inner-button"/>
    <p className="items-count">
      <span className={cx("item-number",itemNumberCx)}>{props.itemCount}</span>
      &nbsp;items left
    </p>
  </div>;
}