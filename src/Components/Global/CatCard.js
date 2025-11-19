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
import './../../style/components.css';

export const percent = new Intl.NumberFormat('default', {
    style: 'percent'
}); 

export const pickIcon = (category) => {
    let icon = null;
    switch(category){
        case "Groceries":
        case "Grocery":
            icon = <ShoppingCartIcon  className="icon" ></ShoppingCartIcon>;    
            break;
        case "Internet":
            icon = <WifiIcon className="icon" ></WifiIcon>;
            break;
        case "Savings":
            icon = <SavingsIcon className="icon" ></SavingsIcon>;
            break;
        case "Phone":
            icon = <LocalPhoneIcon className="icon"></LocalPhoneIcon>;
            break;
        case "Discretionary":
            icon = <LocalAtmIcon className="icon" ></LocalAtmIcon>;
            break;
        default:
            break;
    }
    return icon;
}

export default function CatCard({category, initialAmount, allowInput, width, height, setSelected, isSelected}) {
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
            <div style={{marginTop:'4%',display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center',justifyItems:'center',alignContent:'center',fontSize:'15pt'}}>
                <input onKeyDown={h} style={{paddingLeft:'2%',width:'40%',textAlign:'center'}} className="input" id={category+"Input"} type="number" placeholder="Amount"></input>
                <CheckCircleIcon style={{paddingLeft:'3%'}} fontSize="small" onClick={set}></CheckCircleIcon>
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
        <div id={category} style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column', alignItems:'center',width:"15%",height:'100%'}} className="tooltip">
            <Button className="cat-button" onClick={handleClick} variant="outlined" style={{backgroundColor: isSelected ? 'rgb(80, 99, 125)' : 'inherit'}}>
                {icon}
                {
                    allowInput ? 
                        amountInput ? 
                        inputs()
                        :
                        <span style={{fontSize:'15pt',marginTop:'4%',textAlign:'center',width:'100%',paddingRight:'1%'}} >${amount}</span>
                    :
                    <></>
                }
            </Button>
            <span style={{marginTop:'4%',textAlign:'center',width:'100%'}} className='tooltiptext'>{category}</span>
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