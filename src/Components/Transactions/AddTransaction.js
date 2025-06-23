import Input from '@mui/joy/Input';
import "../../style/default_styles.css";
import Button from '@mui/joy/Button';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { createTransaction } from '../../Controllers/Requests';
import { useState, useContext, useEffect } from 'react';
import { BudgetContext, CATEGORIES } from '../../App.js';
import CatCard from '../Global/CatCard.js';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BudgetDetails from '../Budget/BudgetDetails.js';

export default function Transactions() {

    const budgetNames = JSON.parse(localStorage.getItem("selectedBudget"));
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorElB, setAnchorElB ] = useState(null);
    const [ budget, setBudget ] = useState(JSON.parse(localStorage.getItem("selectedBudget")));
    const { userId, setUserId } = useContext(BudgetContext);
    const [ categories, setCategories ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).categories);
    const [ selectedCat, setSelectedCat ] = useState(null);

    const inputs = ["Amount", "Description", "Date"];
    const navigate = useNavigate();
    function Transaction(category,amount,date, description) {
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    async function addTransaction(event){
        event.preventDefault();
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
    useEffect(() => {
        let names = [];
        Object.keys(categories).map((category,i)=> 
            names.push(categories[category]));
        console.log("useEffect");
      }, []); 
    function handleMenuClose(){}
    return(
            <div className="verticalFlex" style={{width:'100%'}}>
                {
                    budget == null ?
                    <div style={{width:'100%',display:'verticalFlex'}}>
                        <Menu>
                            {Object.keys(budgetNames).map((budgetName,i)=>
                                <MenuItem key={i} id="menuItem" onClick={()=>{setBudget(budgetNames[budgetName]); localStorage.setItem("selectedBudget",JSON.stringify(budgetNames[budgetName])); navigate("/budgets/view")}}>{budgetNames[budgetName].name}</MenuItem>
                            )}
                        </Menu>
                    </div>
                    :
                    <div style={{width:'100%',display:'verticalFlex'}}>
                        <h1>Add a Transaction</h1>
                        <div style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
                            {/*Date*/}
                            <div className="verticalFlex" style={{width:'100%',marginBottom: '3%'}}>
                                <h2>Date</h2>
                                <input className="input" type="date" placeholder="Date"></input>
                            </div>
                            {/*Amount*/}
                            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom: '2%'}}>
                                <h3>Amount:</h3>
                                <input style={{width:'8%',textAlign:'center'}} className="input" type="number" placeholder="$"></input>
                                <CheckCircleIcon fontSize="small" ></CheckCircleIcon>
                            </div>
                            {/* <div className="horizontalFlex" style={{width:'50%'}}>
                                Select a Budget
                                <ArrowDropDownIcon style={{width:'50%',display: anchorElB === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                                <ArrowDropUpIcon style={{width:'50%',display:anchorElB === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>    
                            </div> */}
                            <h2>Category</h2>
                            <div className='horizontalFlex' style={{columnGap:'3%', height:'100%',width:'80%',marginBottom:'2%'}}>
                                {
                                    // catSelect != null ? 
                                    //     <CatCard  selected={selected} width={'10%'} initialAmount={0} allowInput={false}category={selectedCat}></CatCard>
                                    //     :
                                        Object.keys(categories).map((category,i)=> 
                                            <CatCard setSelected={setSelectedCat} isSelected={selectedCat == category ? true : false} width={'10%'} initialAmount={0} key={i} allowInput={false}category={category}></CatCard>
                                        )
                                }
                            </div>   
                            
                            {/*Description*/}
                            <div className="verticalFlex" style={{width:'30%', marginBottom: '1%',height:'100% ',flexWrap:'wrap'}}>
                                <div style={{width:'50%', marginBottom:'2%'}}>Description: </div>
                                <input id="descInput" className="input" name="desc" style={{borderRadius:'5px',border:'solid',borderWidth:'.2px',textAlign:'center',width:'50%',height:'70px'}}placeholder='Enter here'></input>
                            </div>
                        </div>
                        <Button className="button" onClick={addTransaction} variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'1%', width:'5%'}}>Save</Button>
                    </div>
                }
            </div>
        
    )
}