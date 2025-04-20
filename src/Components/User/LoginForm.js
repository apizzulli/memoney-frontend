import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {useEffect, useState} from 'react';
import {login} from '../../Controllers/Requests';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { BudgetContext } from '../../App.js';

export default function LoginForm() {

    const navigate = useNavigate();
    const [ noUser, setNoUser ] = useState(false);
    const [ serverError, setServerError ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { userId, setUserId } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);


    function getRemaining(budget) { 
        let total = budget.total;
        if(budget.transactions){
            budget.transactions.forEach((trans)=>{
                total -= trans.amount;
            })
        }
        budget.remaining = total;
        console.log("H");
    }
    async function loginUser (event) {
        event.preventDefault();
        let userId = null;
        const userDTO = {
            username: document.getElementById("user").value,
            password: document.getElementById("password").value
        };
        const response = await login(userDTO);
        if(!response){
            setNoUser(true);
            return;
        }else if(response == 2){
            setServerError(true);
            return;
        }
        setUserId(response.userId);
        setLoggedIn(true);
        localStorage.setItem("userId",response.userId);
        localStorage.setItem("jwt",response.token.value);
        if(response.budgets.length == 0){
            //localStorage.setItem("budgets", response.json());
            navigate("/budgets/create");
        }else{
            setBudgets(response.budgets);
            response.budgets.forEach((budget)=>{
                getRemaining(budget);
            })
            localStorage.setItem("budgets",JSON.stringify(response.budgets));
            navigate("/budgets/view");
        }
    } 

    return(
        <div className='verticalFlex' >
            <h2>Enter credentials below to login.</h2>
            <div style={{width:'100%',height:'55%'}}>
                <div className='verticalFlex' style={{height:'55%', alignItems:'center'}}>
                    <Input style={{width:'15%'}} id="user" name="user" placeholder="Username" required></Input>
                    <Input style={{width:'15%'}} id="password" name="password" type="password" placeholder="Password" required></Input>
                    <div style={{height:'60%',width: '100%',visibility: noUser || serverError ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder'}}>
                        { noUser ? "No such user" : "Server error"}
                    </div>
                    <Button onClick={loginUser} variant="outlined" style={{marginTop:'0%',fontFamily:'inherit',color:'inherit'}}>Login</Button>
                </div>
            </div>
            <h3 style={{marginTop:'2%'}}>Don't have an account? Create one <a href="/createAccount" style={{textDecoration: "underline"}}>here</a>.</h3>
        </div>
    )
}