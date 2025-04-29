import { useState,useContext } from 'react';
import '../../style/default_styles.css';
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SavingsIcon from '@mui/icons-material/Savings';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shop } from '@mui/icons-material';
import { BudgetContext } from '../../App.js';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const percent = new Intl.NumberFormat('default', {
    style: 'percent'
  });

export default function ViewTransactions() {

    const { lightMode } = useContext(BudgetContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ transactions, setTransactions ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).transactions);//.sort((a, b) => new Date(b.date) - new Date(a.date)));
    const [ remainingVals, setRemainingVals ] = useState(JSON.parse(localStorage.getItem("remainingVals")));
    const budgetName = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);
    const remaining = useState(JSON.parse(localStorage.getItem("selectedBudget")).remaining);
    const total = useState(JSON.parse(localStorage.getItem("selectedBudget")).total);

    function pickIcon(category) {
        let ret = null;
        switch(category){
            case "Groceries":
                ret = <ShoppingCartIcon  style={{color:'white',fontSize:'35pt'}}></ShoppingCartIcon>;
                break;
            case "Grocery":
                ret = <ShoppingCartIcon  style={{color:'white',fontSize:'35pt'}}></ShoppingCartIcon>;
                break;
            case "Internet":
                ret = <WifiIcon style={{fontSize:'45pt', color:'white'}}></WifiIcon>;
                break;
            case "Savings":
                ret = <SavingsIcon style={{fontSize:'45pt', color:'white'}}></SavingsIcon>;
                break;
            case "Phone":
                ret = <LocalPhoneIcon style={{fontSize:'45pt', color:'white'}}></LocalPhoneIcon>;
                break;
            case "Discretionary":
                ret = <LocalAtmIcon style={{fontSize:'40pt', color:'white'}}></LocalAtmIcon>
        }
        return ret;
    }
    const spendCard = (val,i) => {
        let name = Object.keys(val)[0];
        let percentage = Object.values(val)[0];
        let icon = pickIcon(name);
        let textColor = "rgb(56, 194, 25)";
        if(percentage*100 >= 70){
            textColor = "rgb(255,44,44)";
        }else if(percentage >=50){
            textColor = "orange";
        }else if(percentage >= 30){
            textColor = "yellow";
        }  
        return  <Card variant="outlined" key={"card"+i} style={{backgroundColor:'rgb(39, 48, 61)',outlineWidth:'2px',outlineStyle:'solid',outlineColor:'rgba(255, 255, 255, 0.2)',paddingBottom:'2%',paddingTop:'2%',rowGap:'2%',flexDirection:'column',display:'flex',justifyContent:'center',alignContent:'center',width:'10%', height:'50%'}}>
                    <div style={{color:'inherit', height:'50%'}}>{icon}</div>
                    <div style={{marginTop:'6%',color:`${textColor}`, fontWeight:'bolder',height:'50%'}}>{percent.format(percentage)} spent</div>
                </Card>;
    }

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };

    return(
        <div className='verticalFlex' style={{width:'100%', height:'100%'}}>
            <h1>{budgetName}</h1>
            Remaining:
            <div style={{backgroundColor:'red',width:`${remaining/total}%`,height:'5%'}}></div>

            {
                transactions != undefined && transactions.length > 0? 
                <div className='verticalFlex' style={{height:'100%', width:'70%'}}>
                        <div className='horizontalFlex' style={{columnGap:'3%',width:'100%', height:'25%'}}>
                        {
                            remainingVals.map((val, i)=>
                                spendCard(val,i)
                            )
                        }
                    </div>
                    <h2>Transactions:</h2>  
                    <div style={{height:'75%',width:'45%'}}>
                        {transactions.map((trans) => 
                            <div style={{display:'flex',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(39, 48, 61)',marginTop:'2%',height:'8%',marginBottom:'5%'}}>
                                <div style={{marginRight:'2%'}}>{dateStr(trans.date)}</div>
                                <div style={{marginRight:'2%'}}>{pickIcon(trans.category)}</div>
                                <div >{" -" + USDollar.format(trans.amount)}</div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <h2>No Transactions to Display</h2>
            }
            <Button variant="outlined" onClick={()=>navigate("/transactions/add")} style={{fontFamily:'inherit',color:'inherit', marginTop:'1%'}}>Add New Transaction</Button>
        </div>
    );
}