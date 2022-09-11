import "./amount-selector.less";

interface AmountSelectorProps
{
  amount:number
  onChange?(value:number):void
}

export default function AmountSelector(props:AmountSelectorProps):JSX.Element
{
  /** change of number input. trigger onchange handler */
  function h_change(e:React.ChangeEvent<HTMLInputElement>):void
  {
    props.onChange?.(parseInt(e.currentTarget.value) || 0);
  }

  return <div className="amount-selector">
    <h3>GEN. AMOUNT:</h3>
    <input type="number" className="select-box" value={props.amount} onChange={h_change}/>
  </div>;
}