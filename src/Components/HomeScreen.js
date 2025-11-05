import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router'; 
import { useContext } from 'react';
import { BudgetContext } from '../App.js';
import Login from '../Components/User/Login';
import { jwtDecode } from 'jwt-decode';
import '../style/home_style.css';

export default function HomeScreen() {

    const navigate = useNavigate();
    const [ noUser, setNoUser ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    // useEffect(() => {
    //     let token = jwtDecode(localStorage.getItem("token"));
    //     let exp = token.exp.toString();
    //     let now = Date.now();
    //     if(!token || (token && token.exp < Date.now() / 1000)){
    //        localStorage.clear();
    //         navigate("/login", {state: {message: "Session expired, please log in again."}});
    //         return;
    //     }
    //   }, []); 
    return(
        <div id='vertical-flex' style={{marginTop:'2%', width:'100%',height:'100%'}}>
            <h1 className="header" >Welcome to Budgeter</h1>
            { 
                !loggedIn ? 
                (
                    <div style={{marginTop:'2%',width:'100%'}}>
                        <Login/>
                    </div>
                )
                :
                (<div id='vertical-flex' >
                    <Button id="button" style={{marginBottom:'7%'}} onClick={()=>{navigate("/budgets/view")}} size='lg' variant='outlined' >View Budgets</Button>
                    <Button id="button" style={{marginBottom:'7%'}} onClick={()=>{navigate("/budgets/create")}} size='lg' variant='outlined'>Create New Budget</Button>
                    <Button id="button" onClick={()=>{navigate("/transactions/add")}} size='lg' variant='outlined'>Log a transaction</Button>
                </div>)
            }
            <br></br>
        </div>
    )
}