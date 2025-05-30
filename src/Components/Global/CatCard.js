import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SavingsIcon from '@mui/icons-material/Savings';
import '../../style/default_styles.css';
import { useContext, useState, useEffect } from 'react';
import Input from '@mui/joy/Input';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const percent = new Intl.NumberFormat('default', {
    style: 'percent'
}); 

export default function CatCard({category, initialAmount}) {
    const [ amountInput, setAmountInput ] = useState(false);
    const [ amountSet, setAmountSet ] = useState(false);
    const [ amount, setAmount ] = useState(initialAmount);
    let icon = null;
    switch(category){
        case "Groceries":
        case "Grocery":
            icon = <ShoppingCartIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></ShoppingCartIcon>;    
            break;
        case "Internet":
            icon = <WifiIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></WifiIcon>;
            break;
        case "Savings":
            icon = <SavingsIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></SavingsIcon>;
            break;
        case "Phone":
            icon = <LocalPhoneIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></LocalPhoneIcon>;
            break;
        case "Discretionary":
            icon = <LocalAtmIcon  style={{marginTop:'auto',marginBottom:'auto',color:'white',fontSize:'30pt'}}></LocalAtmIcon>;
            break;
        default:
            break;
    }
    // let amountText = null;
    // if(amount){
    //     amountText=<div style={{fontSize:'8pt',marginTop:'12%',color:`${colorPicker(amount)}`, fontWeight:'bolder',height:'50%'}}>{percent.format(amount)} spent</div>;
    // }
    function set(){
        let inputVal = document.getElementById(category+"Input").value;
        if(inputVal != ""){
            setAmount(inputVal);
        }else{
            setAmount(0);
        }
        setAmountInput(false);
    }
    return(
        <div id={category} className="tooltip" style={{width:'10%'}}>
            <Card onClick={()=>setAmountInput(true)} variant="outlined" style={{color:'white',alignItems:'center',flexDirection:'column',display:'flex',marginBottom:'3%',backgroundColor:'rgb(39, 48, 61)',outlineWidth:'2px',outlineStyle:'solid',outlineColor:'rgba(255, 255, 255, 0.2)',width:'100%', height:'100%'}}>
                {icon}
                ${amount}
            </Card>
            <span className='tooltiptext'>{category}</span>
            <div style={{columnGap:'4%',display:'flex',visibility: amountInput ? 'visible' : 'hidden',alignItems:'center'}}>
                <Input id={category+"Input"} placeholder="Amount"></Input>
                <CheckCircleIcon onClick={set}></CheckCircleIcon>
            </div>
            {/* {amountText} */}
        </div>
    );
}

function colorPicker (amount) {
    // let name = Object.keys(val)[0];
    // let amout = Object.values(val)[0];
    // let icon = pickIcon(name);
    let textColor = "rgb(56, 194, 25)";
    if(amount*100 >= 70){
        textColor = "rgb(255,44,44)";
    }else if(amount >=50){
        textColor = "orange";
    }else if(amount >= 30){
        textColor = "yellow";
    }  
    return textColor;
}