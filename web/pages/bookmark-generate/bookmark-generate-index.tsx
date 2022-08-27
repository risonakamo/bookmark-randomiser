import {createRoot} from "react-dom/client";

import "./bookmark-generate-index.less";

export default function BookmarkGenerateIndex():JSX.Element
{
  return <>
  </>;
}

function main()
{
  createRoot(document.querySelector(".main")!).render(<BookmarkGenerateIndex/>);
}

window.onload=main;