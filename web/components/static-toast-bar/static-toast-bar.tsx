import _ from "lodash";

import "./static-toast-bar.less";

interface StaticToastBarProps
{
  path:string[]
}

export default function StaticToastBar(props:StaticToastBarProps):JSX.Element
{
  /** render the path items */
  function r_pathItems():JSX.Element[]
  {
    return _.map(addPathSlashes(props.path),(pathitem:string,i:number):JSX.Element=>{
      return <p key={i}>{pathitem}</p>;
    });
  }

  return <div className="static-toast-bar">
    <img src="/build/imgs/static-toast-bar-arrow.png" className="arrow"/>
    {r_pathItems()}
  </div>;
}

/** add to a array path (array of path items) slashes between the path items */
function addPathSlashes(path:string[]):string[]
{
  return _.reduce(path,(r:string[],pathitem:string):string[]=>{
    r.push("/");
    r.push(pathitem);
    return r;
  },[]);
}