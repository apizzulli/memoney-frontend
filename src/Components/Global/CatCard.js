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
import Button from '@mui/joy/Button';

export const percent = new Intl.NumberFormat('default', {
    style: 'percent'
}); 

export const pickIcon = (category) => {
    let icon = null;
    switch(category){
        case "Groceries":
        case "Grocery":
            icon = <ShoppingCartIcon  style={{color:'white',fontSize:'30pt'}}></ShoppingCartIcon>;    
            break;
        case "Internet":
            icon = <WifiIcon  style={{color:'white',fontSize:'30pt'}}></WifiIcon>;
            break;
        case "Savings":
            icon = <SavingsIcon  style={{color:'white',fontSize:'30pt'}}></SavingsIcon>;
            break;
        case "Phone":
            icon = <LocalPhoneIcon  style={{color:'white',fontSize:'30pt'}}></LocalPhoneIcon>;
            break;
        case "Discretionary":
            icon = <LocalAtmIcon  style={{color:'white',fontSize:'30pt'}}></LocalAtmIcon>;
            break;
        default:
            break;
    }
    return icon;
}

export default function CatCard({category, initialAmount, allowInput, width, setSelected, isSelected}) {
    const [ amountInput, setAmountInput ] = useState(false);
    const [ amountSet, setAmountSet ] = useState(false);
    const [ amount, setAmount ] = useState(initialAmount);

    let icon = pickIcon(category);
    // let amountText = null;
    // if(amount){
    //     amountText=<div style={{fontSize:'8pt',marginTop:'12%',color:`${colorPicker(amount)}`, fontWeight:'bolder',height:'50%'}}>{percent.format(amount)} spent</div>;
    // }
    
    const h =(event) => {
        if (event.key === 'Enter') {
            set(event);
        }
      }
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
    const inputs = () =>{
        return (
            <div style={{display:'flex',flexDirection:'row'}}>
                <input onKeyDown={h} style={{width:'100%',textAlign:'center'}} className="input" id={category+"Input"} type="number" placeholder="Amount"></input>
                <CheckCircleIcon fontSize="small" onClick={set}></CheckCircleIcon>
            </div>
        );
    }
    function handleClick(){
        if(!allowInput){
            setSelected(category);
        }else{
            setAmountInput(true);
        }
    }
    return(
        <div id={category} style={{width: width}} className="tooltip">
            <Button className="button" onClick={handleClick} variant="outlined" style={{backgroundColor: isSelected ? 'rgb(80, 99, 125)' : 'inherit',height:'100%',maxHeight:'200px',width:'100%',color:'white',alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'column',display:'flex'}}>
                {icon}
                {
                    allowInput ? 
                        amountInput ? 
                        inputs()
                        :
                        <div style={{width:'100%', height:'100%',marginRight:'0%',marginLeft:'0%'}} >
                            <span style={{textAlign:'center',display:'block',width:'100%',}} >${amount}</span>
                        </div>
                    :
                    <></>
                }
            </Button>
            <span style={{textAlign:'center'}} className='tooltiptext'>{category}</span>
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