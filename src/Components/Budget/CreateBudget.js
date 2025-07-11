import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CategoryForm from '../Global/CategoryForm';
import CatCard from '../Global/CatCard';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../style/budget_style.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newBudget } from '../../Controllers/BudgetController.js';
import { BudgetContext } from '../../App.js';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { pickIcon } from '../Global/CatCard.js';
import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const CATEGORIES=[
    "Groceries",
    "Internet",
    "Phone",
    "Savings",
    "Discretionary"
]
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
    const [ amountInput, setAmountInput ] = useState(false);

    const { budgets, setBudgets } = useContext(BudgetContext);
    const { userId, setUserId } = useContext(BudgetContext);
    
    async function createBudget (event) {
        event.preventDefault();
        let categories = {};
        CATEGORIES.forEach((category)=>{
            let val = document.getElementById(category).value;
            if(val == "")
                val = 0;
            categories[category]= parseFloat(val);
            console.log(val);
            // categories.push(savedCategories[i].name);
        })
        // let object = savedCategories.reduce((obj, item) => Object.assign(obj, { [item.name]: item.amount }), {});
        const newBudg = {
            name: document.getElementById("nameInput").value, 
            total: document.getElementById("totalInput").value*1,
            categories: categories
        };
        let userId = localStorage.getItem("userId");
        const created = await newBudget(userId, newBudg, localStorage.getItem("jwt"));
        if(!created){
            setServerFail(true);
        }
        else{
            // currentBudgets.push(created);
            // localStorage.setItem("budgets",JSON.stringify(currentBudgets));
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
    function h(event){
        console.log('hi');
    }
    return(
        <div className="verticalFlex" style={{width: '100vw'}}>
            <h1>New Budget</h1>
            <div className="verticalFlex" style={{width:'60%', height:'60%'}}>
                <div className='horizontalFlex' style={{gap:'5%',height:'15%'}}>
                    <Input id="nameInput" name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                    <Input id="totalInput" name="total" sx={{width: 200}} placeholder="Total" required></Input>
                </div>
                <h2 style={{marginTop:'4%'}}>Categories</h2>
                <div className='horizontalFlex' style={{columnGap:'3%', height:'100%',width:'80%'}}>
                    {
                        /*/
                            {Object.keys(CATEGORIES).map((name,i)=><MenuItem id="menuItem" onClick={()=>menuClick(CATEGORIES[name])}>
                                {CATEGORIES[name]}</MenuItem>
                        )}*/
                        CATEGORIES.map((category,i)=> 
                            <CatCard allowInput={true} initialAmount={0} key={i} category={category}></CatCard>
                        )
                    }
                    <span style={{}}>New <AddCircleIcon style={{paddingLeft:'5%',fontSize:'10pt'}}></AddCircleIcon></span>
                </div>               
                <Button onClick={createBudget} variant="outlined" style={{color:'white',fontFamily:'inherit'}} >Save<SaveAltIcon  style={{fontSize:'15pt',marginLeft:'8%',hover:'cursor'}}></SaveAltIcon></Button> 
            </div>
            <h3 style={{visibility: serverFail ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'2%'}}>Server error, please try again</h3>
        </div>
    );
}