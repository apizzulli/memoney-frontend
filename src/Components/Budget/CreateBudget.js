import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CategoryForm from '../Global/CategoryForm';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newBudget } from '../../Controllers/Requests.js';
import { BudgetContext } from '../../App.js';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';

function BudgetObj(name,total,categories) {
    this.name = name;
    this.total = total;
    this.remaining = total;
    this.categories = categories;
    this.transactions = null;
}

export default function CreateBudget(){

    const navigate = useNavigate();
    const [ savedCategories, saveCategories ] = useState([]);
    const [ serverFail, setServerFail ] = useState(false);
    const { budgets, setBudgets } = useContext(BudgetContext);
    const { userId, setUserId } = useContext(BudgetContext);

    async function createBudget (event) {
        let currentBudgets = JSON.parse(localStorage.getItem("budgets"));
        event.preventDefault();
        let object = savedCategories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});
        const newBudg = {
            name: document.getElementById("nameInput").value, 
            total: document.getElementById("totalInput").value*1,
            categories: object
        };
        let userId = localStorage.getItem("userId");
        const created = await newBudget(userId, newBudg, localStorage.getItem("jwt"));
        if(!created){
            setServerFail(true);
        }
        else{
            currentBudgets.push(created);
            localStorage.setItem("budgets",JSON.stringify(currentBudgets));
            //setBudget());
            navigate("/budgets/view");
        }
        //setcreateBudget(true);
    }

    const getBudget = () =>{
        fetch(`http://localhost:8080/getBudget/${1}`)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    return(
        <div className="verticalFlex" style={{width: '100vw'}}>
            <h1>New Budget</h1>
            <div style={{display:'grid'}}>
                <div className='horizontalFlex' style={{gap:'5%'}}>
                    <Input id="nameInput" name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                    <Input id="totalInput" name="total" sx={{width: 200}} placeholder="Total" required></Input>
                </div>
                <h2 style={{marginTop:'10%'}}>Categories</h2>
                {savedCategories.map((cat) => <div>{cat.name + ": $" + cat.amount}</div>)}
                <CategoryForm savedCategories={savedCategories} saveCategories={saveCategories}></CategoryForm>
                <div style={{hover:'cursor',marginTop:'10%',fontSize:'25pt', gap:'3%'}} className='horizontalFlex'>
                    <div >Save</div> 
                    <SaveAltIcon onClick={createBudget} style={{hover:'cursor',fontSize:'25pt'}}></SaveAltIcon>
                </div>
            </div>
            <h3 style={{visibility: serverFail ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'4%'}}>Server failure, please try again</h3>
        </div>
    );
}