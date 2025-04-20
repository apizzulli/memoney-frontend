import { CategoryRounded } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function BudgetDetails({budget}) {
    
    const navigate = useNavigate();
    const location = useLocation();
    let categories = JSON.parse(localStorage.getItem("selectedBudget")).categories;

    function cats(){
        console.log("hi");
        console.log(location.state.budget);
        {Object.keys(budget.transactions).map((transaction) => console.log(transaction))};
        console.log("hey");
    }
    
    return(
        <div>
            <h3>Categories:</h3>
            <br></br>
            <div>
                <Button style={{fontFamily:'inherit',color:'inherit'}} onClick={cats}>recent</Button>
                Recent Transactions: 
                {Object.keys(budget.transactions).map((transaction) => <div key={transaction.name} style={{width:'100%'}}>{transaction.name + ": $" }</div>)}
            </div>
            <Button style={{fontFamily:'inherit',color:'inherit'}} onClick={()=>{navigate("/transactions/add")}}>Add a Transaction</Button>
        </div>
    );
}