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

    function pickIcon(category) {
        let ret = null;
        switch(category){
            case "Groceries":
                ret = <ShoppingCartIcon style={{fontSize:'45pt', color:'white'}}></ShoppingCartIcon>;
                break;
            case "Grocery":
                ret = <ShoppingCartIcon style={{fontSize:'45pt', color:'white'}}></ShoppingCartIcon>;
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
        return  <Card variant="outlined" key={"card"+i} className='verticalFlex' id={lightMode ? '.card-light' : 'card-dark'} style={{width:'20%', height:'100%'}}>
                    <div style={{color:'inherit'}}>{icon}</div>
                    <div style={{color:`${textColor}`, fontWeight:'bolder'}}>{percent.format(percentage)} spent</div>
                </Card>;
    }

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };

    return(
        <div className='verticalFlex' style={{width:'100%', height:'100%'}}>
            <h1>{budgetName}</h1>
            {
                transactions != undefined && transactions.length > 0? 
                <div>
                        <div className='horizontalFlex' style={{columnGap:'3%',width:'70%', height:'25%'}}>
                        {
                            remainingVals.map((val, i)=>
                                spendCard(val,i)
                            )
                        }
                    </div>
                    <h2>Transactions:</h2>  
                    <div style={{height:'75%',width:'40%'}}>
                        {transactions.map((trans) => 
                            <div id={lightMode ? '.card-light' : 'card-dark'} className='horizontalFlex'style={{marginTop:'2%',height:'8%',marginBottom:'5%'}}>
                                <div style={{paddingRight:'2%'}}>{dateStr(trans.date)}</div>
                                <div>{pickIcon(trans.category)}</div>
                                <div style={{fontSize:'15pt',width:'25%'}}>{" -" + USDollar.format(trans.amount)}</div>
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