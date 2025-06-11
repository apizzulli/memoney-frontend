import { useState,useContext, useEffect } from 'react';
import '../../style/default_styles.css';
import Button from '@mui/joy/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shop } from '@mui/icons-material';
import { BudgetContext } from '../../App.js';
import { pickIcon } from '../Global/CatCard.js';
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function ViewTransactions() {

    const { lightMode } = useContext(BudgetContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ transactions, setTransactions ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).transactions);//);.sort((a, b) => new Date(a.date) - new Date(b.date));
    const [ remainingVals, setRemainingVals ] = useState(JSON.parse(localStorage.getItem("remainingVals")));
    const budgetName = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);
    const [ remaining, setRemaining ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).remaining);
    const [ total, setTotal ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).total);

    const view=()=>{
        let j = JSON.parse(localStorage.getItem("selectedBudget")).remaining;
        console.log("hi");
    }

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };
    useEffect(() => {
        let k = localStorage.getItem("selectedBudget");
        let budget = null;
        if(k)
            budget = JSON.parse(k);
        let spent = budget.total - budget.remaining;
        let per = spent/budget.total * 100;
        console.log("hi");
      }, []); 
    return(
        <div onClick={view} style={{display:'flex', flexDirection:'column', alignItems:'center',width:'100%', height:'100%'}}>
            <h1>{budgetName}</h1>
            <div className="horizontalFlex" style={{marginTop:'1%',height:'5%',borderRadius: '15px',alignItems:'center', justifyContent:'center',width:'60%', columnGap:'0'}}>
                <div className="tooltip" style={{borderTopLeftRadius:'15px', borderBottomLeftRadius:'15pt',backgroundColor:'red',width:`${total-remaining}%`}}>
                    <span className='tooltiptext'>{Math.round((total-remaining)/total*100)}% Spent</span>
                </div>
                <div className='tooltip' style={{borderTopRightRadius:'15pt',borderBottomRightRadius:'15pt',backgroundColor:'green',width:`${remaining}%`}}>
                    <span  className='tooltiptext'>{Math.round((remaining/total)*100)}% Remaining</span>
                </div>
            </div>
            <h3 style={{marginTop:'1%'}}>{USDollar.format(remaining)} Remaining</h3>
            {
                transactions != undefined && transactions.length > 0? 
                <div className='verticalFlex' style={{height:'30%', width:'70%'}}>
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
            <Button className="button" variant="outlined" onClick={()=>navigate("/transactions/add")} style={{marginTop:'1%',fontFamily:'inherit',color:'inherit'}}>Add New Transaction</Button>
        </div>
    );
}