import cx,{Mapping} from "classnames";

import "./generate-button.less";

import FatButton,{ButtonMode} from "components/fat-button/fat-button";

interface GenerateButtonProps
{
  itemCount:number
}

export default function GenerateButton(props:GenerateButtonProps):JSX.Element
{
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

  return <div className="generate-button">
    <FatButton text={buttonText} mode={buttonMode} className="inner-button"/>
    <p className="items-count">
      <span className={cx("item-number",itemNumberCx)}>{props.itemCount}</span>
      &nbsp;items left
    </p>
  </div>;
}