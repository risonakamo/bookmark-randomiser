import {useState} from "react";
import cx,{Mapping} from "classnames";

import "./fat-button.less";

export type ButtonMode="normal"|"disabled"|"opened"|"open-again"

interface FatButtonProps
{
  mode?:ButtonMode
  text:string

  hoverText?:string
  hoverMode?:ButtonMode

  className?:string
  onClick?():void
}

export default function FatButton(props:FatButtonProps):JSX.Element
{
  // -- states --
  const [hovering,setHovering]=useState<boolean>(false);


  // -- handlers --
  /** hovering over button, set hovering */
  function h_hover():void
  {
    setHovering(true);
  }

  /** unhovering over button, unset hovering */
  function h_unhover():void
  {
    setHovering(false);
  }


  // -- render --
  // compute button mode. if hovering and there is a hovermode, use the hover mode instead
  var buttonmode:ButtonMode=props.mode || "normal";

  if (hovering && props.hoverMode)
  {
    buttonmode=props.hoverMode;
  }


  // compute classes
  const topCx:Mapping={
    disabled:buttonmode=="disabled",
    normal:buttonmode=="normal",
    opened:buttonmode=="opened",
    "open-again":buttonmode=="open-again",

    enabled:buttonmode=="normal" || buttonmode=="opened" || buttonmode=="open-again"
  };


  // compute text. if hovering and there is hover text, use the hover text instead
  var text:string=props.text;

  if (hovering && props.hoverText)
  {
    text=props.hoverText;
  }


  return <div className={cx("fat-button",topCx,props.className)} onMouseEnter={h_hover}
    onMouseLeave={h_unhover} onClick={props.onClick}
  >
    <img src="/build/imgs/opened-check.png" className="check-icon"/>
    <h2>{text}</h2>
  </div>;
}