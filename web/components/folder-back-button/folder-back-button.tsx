import "./folder-back-button.less";

interface FolderBackButtonProps
{

}

export default function FolderBackButton(props:FolderBackButtonProps):JSX.Element
{
  return <div className="folder-back-button">
    <img src="/build/imgs/folder-back.png"/>
  </div>;
}