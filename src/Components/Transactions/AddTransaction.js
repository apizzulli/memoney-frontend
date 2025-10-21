import Input from '@mui/joy/Input';
import "../../style/default_styles.css";
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { createTransaction } from '../../Controllers/TransactionController.js';
import { useState, useContext, useEffect } from 'react';
import { BudgetContext } from '../../App.js';
import CatCard from '../Global/CatCard.js';
import { useNavigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BudgetDetails from '../Budget/BudgetDetails.js';
/*
 budget == null ?
                <div style={{width:'100%',display:'vertical-flex'}}>
                    <Menu>
                        {Object.keys(budgetNames).map((budgetName,i)=>
                            <MenuItem key={i} id="menuItem" onClick={()=>{setBudget(budgetNames[budgetName]); localStorage.setItem("selectedBudget",JSON.stringify(budgetNames[budgetName])); navigate("/budgets/view")}}>{budgetNames[budgetName].name}</MenuItem>
                        )}
                    </Menu>
                </div>
                :
*/
const CATEGORIES=[
    "Groceries",
    "Internet",
    "Phone",
    "Savings",
    "Discretionary"
]
export default function Transactions() {

    const budgetNames = JSON.parse(localStorage.getItem("selectedBudget"));
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorElB, setAnchorElB ] = useState(null);
    const [ budget, setBudget ] = useState(JSON.parse(localStorage.getItem("selectedBudget")));
    const [ categories, setCategories ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).categories);
    const [ selectedCat, setSelectedCat ] = useState(null);
    const [ amountInput, setAmountInput ] = useState(false);
    const [ amount, setAmount ] = useState(0);
    const [ dateError, setDateError ] = useState(false);
    const [ amountError, setAmountError ] = useState(false);
    const { userId, setUserId } = useContext(BudgetContext);
    const inputs = ["Amount", "Description", "Date"];

    const navigate = useNavigate();

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    function Transaction(category,amount,date, description) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    async function addTransaction(event){
        event.preventDefault();
        if(document.getElementById("dateInput").value == "" || document.getElementById("amountInput").value == ""){
            if(document.getElementById("dateInput").value == ""){
                setDateError(true);                
            }
            if(document.getElementById("amountInput").value == ""){
                setAmountError(true);
            }
            await sleep(3000);
            setDateError(false);
            setAmountError(false);
            return;
        }
        
        let newTrans = new Transaction(selectedCat, document.getElementById("amountInput").value, document.getElementById("dateInput").value, document.getElementById("descInput").value);
        let budgId = JSON.parse(localStorage.getItem("selectedBudget")).id;
        let newBudg = await createTransaction((JSON.parse(localStorage.getItem("selectedBudget"))).id, newTrans);
        localStorage.setItem("selectedBudget",newBudg);
        navigate("/budgets/view");
    }

    const handleMenuOpen =(event)=>{
        setAnchorEl(event.currentTarget.parentElement);
    }

    const menuChoice = (cat) => {
        setSelectedCat(cat);
        setAnchorEl(null);
    }

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#categoryMenu');
        if (e.target != document.querySelector("#categoryMenuItem") && Boolean(anchorEl)) {
            setAnchorEl(null);
        }
    });
    // function select(){
    //     setSelected(!selected);
    // }
    function addCategory(){
        setCategories(CATEGORIES);
    }
    useEffect(() => {
        let names = [];
        Object.keys(categories).map((category,i)=> 
            names.push(categories[category]));
        console.log("useEffect");
      }, []); 
    function handleAmount() {
        setAmount(document.getElementById("amountInput").value);
        setAmountInput(false);
    }
    function handleMenuClose(){}
    return(
            <div className="vertical-flex" style={{height:'20%',width:'100%', marginTop:'1%'}}>   
                <div className="vertical-flex" style={{width:'70vw'}}>
                    <h1 style={{marginTop:'0'}}>New Transaction</h1>
                    <h2>{budget.name}</h2>

                    {/*------DATE & AMOUNT------*/}
                    <div className='vertical-flex'style={{justifyContent:'space-between'}}>
                        <div className='horizontal-flex' style={{height:'15%',width:'100%',justifyContent:'space-between'}}>
                            <h3>Amount:</h3>
                            <input id="amountInput" style={{textAlign:'right'}} className="input" type="number" placeholder="Enter Dollar Amount" required ></input>
                        </div>
                        <div style={{visibility: amountError ? 'visible': 'hidden',color:'red',marginTop:'1%',marginBottom:'1%', width:'100%'}}>Amount field is required.</div>
                        <div className='horizontal-flex' style={{height:'15%',width:'100%',justifyContent:'space-between'}}>
                            <h3 >Date:</h3>
                            <input required id="dateInput" style={{textAlign:'center'}} className="input" type="date" helperText="Date field is required." error={dateError}></input>
                        </div>
                        <div style={{visibility: dateError ? 'visible': 'hidden',color:'red',marginTop:'1%',marginBottom:'1%', width:'100%'}}>Date field is required.</div>
                    </div>
                    {/*------CATEGORIES------*/}  
                    <h3 >Category:</h3>
                    <div className='horizontal-flex' style={{alignItems:'center',columnGap:'5%', width:'100%'}}>
                    {
                        // catSelect != null ? 
                        //     <CatCard  selected={selected} width={'10%'} initialAmount={0} allowInput={false}category={selectedCat}></CatCard>
                        //     :
                            CATEGORIES.map((category,i)=> 
                                <CatCard setSelected={setSelectedCat} isSelected={selectedCat == category ? true : false} width={30} height={60} initialAmount={0} key={i} allowInput={false}category={category}></CatCard>
                            )
                    }
                    </div> 

                    {/*------DESCRIPTION------*/}
                    <h3 style={{width:'50%', marginBottom:'2%'}}>Description: </h3>
                    <input id="descInput" className="input" name="desc" style={{borderRadius:'5px',border:'solid',borderWidth:'.2px',textAlign:'center',width:'20%',height:'70px'}}placeholder='Enter here'></input>
                </div>
            <Button className="button" onClick={addTransaction} variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'2%', width:'5%'}}>Save</Button>
        </div>
    )
}