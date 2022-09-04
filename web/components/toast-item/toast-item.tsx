import "./toast-item.less";

interface ToastItemProps
{
  toastText:string
  onClick?():void
}

export default function ToastItem(props:ToastItemProps):JSX.Element
{
  return <p className="toast-item" onClick={props.onClick}>
    {props.toastText}
  </p>;
}