import "./folder-item.less";

interface FolderItemProps
{

}

export default function FolderItem(props:FolderItemProps):JSX.Element
{
  return <div className="folder-item">
    <div className="icon-zone">
      <div className="folder-icon"></div>
    </div>
    <div className="label">
      <h2 title="asdajdoijas9d8fh98saf sag dsjf gjdks fgkjds fgkjds gkdjshfg">folder1 something</h2>
      <p>120 items</p>
    </div>
  </div>;
}