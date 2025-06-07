import { useContext, useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function InputField(name, amount){
    const [ amountInput, setAmountInput ] = useState(false);
    const [ amountSet, setAmountSet ] = useState(false);
    const [ amount, setAmount ] = useState(initialAmount);

    function set(event){
        event.stopPropagation();
        let inputVal = document.getElementById(category+"Input").value;
        if(inputVal != ""){
            setAmount(inputVal);
        }else{
            setAmount(0);
        }
        setAmountInput(false);
    }

    return (
        <div style={{width:'100%', height:'100%'}} >
            <div style={{height:'100%', columnGap:'0%',rowGap:'0%',flexWrap:'nowrap'}} className='horizontalFlex'>
                <input style={{width:'55%',marginLeft:"0%"}} className="input" id={name+"Input"} text="$" placeholder="Amount"></input>
                <CheckCircleIcon style={{width:'10%',height:'100%',marginLeft:"5%"}} onClick={set}></CheckCircleIcon>
                <span >${amount}</span>
            </div>
        </div>
    );
}