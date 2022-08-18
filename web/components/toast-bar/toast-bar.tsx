import ToastItem from "components/toast-item/toast-item";
import ToastArrow from "components/toast-arrow/toast-arrow";

import "./toast-bar.less";

interface ToastBarProps
{

}

export default function ToastBar(props:ToastBarProps):JSX.Element
{
  return <div className="toast-bar">
    <ToastItem toastText="/"/>
    <ToastArrow/>
    <ToastItem toastText="folder1"/>
  </div>;
}