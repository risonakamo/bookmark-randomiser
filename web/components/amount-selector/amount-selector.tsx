import "./amount-selector.less";

interface AmountSelectorProps
{

}

export default function AmountSelector(props:AmountSelectorProps):JSX.Element
{
  return <div className="amount-selector">
    <h3>GEN. AMOUNT:</h3>
    <input type="number" className="select-box" defaultValue={10}/>
  </div>;
}