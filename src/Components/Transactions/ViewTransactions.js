import { useState,useContext } from 'react';
import '../../style/default_styles.css';
import Button from '@mui/joy/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shop } from '@mui/icons-material';
import { BudgetContext } from '../../App.js';
// import { spendCard, pickIcon } from '../Global/CatCard.js';
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});



export default function ViewTransactions() {

    const { lightMode } = useContext(BudgetContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ transactions, setTransactions ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).transactions);//.sort((a, b) => new Date(b.date) - new Date(a.date)));
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

    return(
        <div onClick={view} className='verticalFlex' style={{width:'100%', height:'100%'}}>
            <h1 >{budgetName}</h1>
            <div style={{height:'30%',width:'40%'}}className='verticalFlex'>
                <div className="horizontalFlex" style={{height:'75%',width:'100%'}}>
                    <div style={{backgroundColor:'red',width:`${total-remaining}%`,height:'5%'}}></div>
                    <div style={{backgroundColor:'green',width:`${remaining}%`,height:'5%'}}></div>
                </div>
                {USDollar.format(remaining)} Remaining
            </div>
            {
                transactions != undefined && transactions.length > 0? 
                <div className='verticalFlex' style={{height:'100%', width:'70%'}}>
                        <div className='horizontalFlex' style={{columnGap:'3%',width:'100%', height:'25%'}}>
                        {/* {
                            remainingVals.map((val, i)=>
                                spendCard(val,i)
                            )
                        } */}
                    </div>
                    <h2>Transactions:</h2>  
                    <div style={{height:'75%',width:'45%'}}>
                        {transactions.map((trans) => 
                            <div style={{display:'flex',flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(39, 48, 61)',marginTop:'2%',height:'8%',marginBottom:'5%'}}>
                                <div style={{marginRight:'2%'}}>{dateStr(trans.date)}</div>
                                {/* <div style={{marginRight:'2%'}}>{pickIcon(trans.category)}</div> */}
                                <div >{" -" + USDollar.format(trans.amount)}</div>
                            </div>
                        )}
                    </div>
                </div>
                :
                <h2>No Transactions to Display</h2>
            }
            <Button className="button" variant="outlined" onClick={()=>navigate("/transactions/add")} style={{fontFamily:'inherit',color:'inherit', marginTop:'1%'}}>Add New Transaction</Button>
        </div>
    );
}