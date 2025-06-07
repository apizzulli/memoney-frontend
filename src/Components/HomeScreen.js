import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import { BudgetContext } from '../App.js';
import Login from '../Components/User/Login';
import { jwtDecode } from 'jwt-decode';

export default function HomeScreen() {

    const navigate = useNavigate();
    const [ noUser, setNoUser ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    useEffect(() => {
        let token = jwtDecode(localStorage.getItem("token"));
        let exp = token.exp.toString();
        let now = Date.now();
        if(!token || (token && token.exp < Date.now() / 1000)){
           localStorage.clear();
            navigate("/login", {state: {message: "Session expired, please log in again."}});
            return;
        }
      }, []); 
    return(
        <div className='verticalFlex' style={{marginTop:'2%', width:'100%'}}>
            <h1 style={{margin: 0}}>Welcome to Budgeter</h1>
            { 
                !loggedIn ? 
                (
                    <div style={{marginTop:'2%',width:'100%'}}>
                        <Login/>
                    </div>
                )
                :
                (<div className='verticalFlex' style={{marginTop:'2%', height:'100%'}}>
                    <Button className="button" onClick={()=>{navigate("/budgets/view")}} size='lg' variant='outlined' style={{fontFamily:'inherit',color:'inherit', marginBottom:'1%'}}>View Budgets</Button>
                    <Button className="button" onClick={()=>{navigate("/budgets/create")}} size='lg' variant='outlined'style={{fontFamily:'inherit',color:'inherit', marginBottom:'1%'}}>Create New Budget</Button>
                    <Button className="button" onClick={()=>{navigate("/transactions/add")}} size='lg' variant='outlined'style={{fontFamily:'inherit',color:'inherit'}}>Log a transaction</Button>
                </div>)
            }
            <br></br>
        </div>
    )
}