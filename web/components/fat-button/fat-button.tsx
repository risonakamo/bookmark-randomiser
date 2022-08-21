import cx,{Mapping} from "classnames";

import "./fat-button.less";

type ButtonMode="normal"|"disabled"|"opened";

interface FatButtonProps
{
  mode?:ButtonMode
  text:string
}

export default function FatButton(props:FatButtonProps):JSX.Element
{
  const buttonmode:ButtonMode=props.mode || "normal";

  const topCx:Mapping={
    disabled:buttonmode=="disabled",
    normal:buttonmode=="normal"
  };

  return <div className={cx("fat-button",topCx)}>
    <h2>{props.text}</h2>
  </div>;
}