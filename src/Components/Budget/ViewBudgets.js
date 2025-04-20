import { ListItem } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import '../../style/default_styles.css'
import BudgetDetails from "./BudgetDetails";
import Stack from '@mui/material/Stack';

export default function ViewBudgets(props){
    const navigate = useNavigate();
    const location = useLocation();
    const [ detailedView, setDetailedView ] = useState(null);
    const [ budgets, setBudgets ] = useState(JSON.parse(localStorage.getItem("budgets")));

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };
    
    function click(){
        console.log("click func location.state.budgets="+location.state);
    }

    function editClick(budget){
        navigate("/budgets/edit", { state: { budget }, updateBudget: {updateBudgets} });
    }

    function updateBudgets(newBudgets) {
        setBudgets(newBudgets);
        localStorage.setItem("budgets",newBudgets);
    }

    function transactions(budget) {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        if(budget.transactions == undefined){
            navigate("/transactions/add");
            return;
        }
        let vals = [];
        Object.keys(budget.categories).map((cat)=>{
            let spent = 0;
            budget.transactions.forEach((t)=>{
                if(t.category == cat){
                    spent += t.amount;
                }
            })
            vals.push({[cat]: spent/budget.categories[cat]});
        })
        localStorage.setItem("remainingVals",JSON.stringify(vals));
        navigate("/transactions");
    }

    function navToDetails(budget) {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        navigate("/budgetDetails", {state: budget});
    }

    function goToEdit(budget) {
        localStorage.setItem("selectedBudget",JSON.stringify(budget));
        navigate("/budgets/edit");
    }

    const budgetView = (budget) => {
        let categories = null;
        if(budget.categories != undefined){
            categories = Object.keys(budget.categories);
        }
        return(
            <div className="verticalFlex" style={{backgroundColor:'rgb(146, 159, 178, 0.130)',paddingTop: '3%', paddingBottom: '3%',marginBottom:'4%',width:'25%', borderRadius: '15px',height:'100%'}}>
                <Stack alignItems="center" direction="row" style={{marginLeft:'7px', cursor:'pointer'}}  ><h2 style={{margin:'0'}}>{budget.name}</h2><ModeEditIcon onClick={()=>goToEdit(budget)} style={{marginLeft:'7px'}} ></ModeEditIcon></Stack>
                <h2 style={{margin:0}}>{USDollar.format(budget.remaining) + " remaining"}</h2>
                    {budget.transactions != undefined && budget.transactions.length > 0 ? 
                        (
                            <div>
                                <h3>Recent Transactions:</h3>
                                {budget.transactions.slice(0,3).map((trans) => <div style={{width:'100%'}}>{dateStr(trans.date) + ": " + trans.category + ", " + USDollar.format(trans.amount)}</div>)}
                            </div>)
                        :
                        <h3>No Recent Transactions</h3>
                    }
                    <Button variant="outlined" onClick={()=>transactions(budget)} style={{color:'inherit',fontFamily:'inherit',marginBottom:'5%',marginTop:'2%'}}>Go to Transactions</Button>
            </div>
        );
    }

    return (
        <div style={{height:'100vh'}}>
            <h1>Your Budgets:</h1>
            {   
                budgets != undefined ? 
                <div className="verticalFlex">
                    {
                        budgets.map((budget,i) => 
                            <div key={i} className={"verticalFlex"}>
                                {budgetView(budget)}
                            </div>)
                    }
                </div>
                :
                <div>Sorry! No data</div>
            }
        </div>
    )
}