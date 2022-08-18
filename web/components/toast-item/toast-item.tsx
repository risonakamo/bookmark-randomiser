import "./toast-item.less";

interface ToastItemProps
{
  toastText:string
}

export default function ToastItem(props:ToastItemProps):JSX.Element
{
  return <p className="toast-item">
    {props.toastText}
  </p>;
}