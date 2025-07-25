import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import '../../style/budget_style.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { editBudget } from '../../Controllers/BudgetController.js'; 
import CatCard from '../Global/CatCard';

function Category(name, amount){
    this.name = name;
    this.amount = amount;
}

function BudgetObj(id, name,total,categories) {
    this.id = id;
    this.name = name;
    this.total = total;
    this.categories = categories;
}
const CATEGORIES=[
    "Groceries",
    "Internet",
    "Phone",
    "Savings",
    "Discretionary"
]
export default function EditBudget(){

    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ budget, setBudget ] = useState(JSON.parse(localStorage.getItem("selectedBudget")));

    const [ hasBeenEdited, setHasBeenEdited ] = useState(false);
    const [ noChanges, setNoChanges ] = useState(false);
    const [ serverError, setServerError ] = useState(false);

    const [ currentName, setCurrentName ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);
    const [ editName, setEditName ] = useState(false);

    const [ currentTotal, setCurrentTotal ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).total);
    const [ editTotal, setEditTotal ] = useState(false);
    
    const [ currentCategories, setCurrentCategories ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).categories);
    const [ editCategory, setEditCategory ] = useState(null);

    let open = Boolean(anchorEl);
    const location = useLocation();

    const areCatsSame = () =>{
        let c1 = Object.keys(currentCategories);
        let c2 = Object.keys(budget.categories);
        if(c1.length == c2.length){
            for(let i = 0; i < c1.length; i++){
                if(currentCategories[c1[i]] != budget.categories[c2[i]]){
                    return false;
                }    
            }
        }else{
            return false;
        }
        return true;
    }
    async function saveBudget(event) {
        if(!hasBeenEdited){
            let s = areCatsSame();
            if(s){
                setNoChanges(true);
                setTimeout(() => {
                    setNoChanges(false);
                }, 3000); // Message will disappear after 3 seconds
                return;
            }
        }
        event.preventDefault();
        console.log("editing...");
        let budgId = JSON.parse(localStorage.getItem("selectedBudget")).id;
        let budgTotal = JSON.parse(localStorage.getItem("selectedBudget")).total;
        let newTotal = currentTotal;
        if(budgTotal == currentTotal){
            newTotal = -1;
        }
        const editedBudget = new BudgetObj(budgId, currentName, currentTotal, currentCategories);
        const response = await editBudget(editedBudget, budgId);
        let budgets = JSON.parse(localStorage.getItem("budgets"));
        if(response){
            for(let i = 0; i < budgets.length; i++){
                console.log("In foreach");
                if(budgets[i].id == budgId){
                    budgets[i] = response;
                    console.log("matches, changing");
                }
            }
            localStorage.setItem("budgets",JSON.stringify(budgets));
            localStorage.removeItem("selectedBudget");
            navigate(-1);
            console.log("response");
        }else{
            setServerError(true);
            setTimeout(() => {
                setServerError(false);
            }, 3000); // Message will disappear after 3 seconds
            return;
        }
    }

    function nameDone() {
        setEditName(false);
        let newName = document.getElementById("nameInput").value;
        if(newName != currentName){
            setCurrentName(newName);
            if(!hasBeenEdited) {
                setHasBeenEdited(true);
            }
        }
    }

    function totalDone() {
        setEditTotal(false);
        let newTotal = document.getElementById("totalInput").value;
        if(newTotal != currentTotal){
            setCurrentTotal(newTotal);
            if(!hasBeenEdited) {
                setHasBeenEdited(true);
            }
        }
    }

    function categoriesDone(oldName,i) {
        setEditCategory(null);
        let newName = document.getElementById("name"+i).value;
        let newAm = document.getElementById("amount"+i).value;
        let newObj = {}
        let arr = Object.keys(currentCategories);
        arr.filter((key)=>{
            if(key != oldName){
                newObj[key] = currentCategories[key]
            } else {
                newObj[newName] = newAm
            }
        })
        setCurrentCategories(newObj);
    }

    function editCat(name) {
        setEditCategory(name);
    }
    const nameDisplay = 
        <div style={{width:'100%'}}>
            <div className='horizontalFlex' style={{width:'100%',justifyContent:'space-between'}}>
                <h2 >Name:</h2>
                {editName && !editTotal ? 
                    <div className='horizontalFlex'>
                        <Input id="nameInput" defaultValue={currentName} name="budgetName" sx={{width: 200}} placeholder="Budget Name" required></Input>
                        <Button className="button" onClick={nameDone} variant="outlined" style={{fontFamily:'inherit',color:'inherit',marginLeft:'6pt'}}>Done</Button>
                    </div>
                    :
                    <div className='horizontalFlex'>
                        <div style={{fontSize:'15pt'}}>{currentName}</div>
                        <ModeEditIcon onClick={()=>setEditName(true)} style={{fontSize:'18pt', marginLeft:'6pt'}}></ModeEditIcon>
                    </div>
                }
            </div>
        </div>
    const totalDisplay = 
                <div style={{width:'100%'}}>
                    <div className='horizontalFlex' style={{width:'100%',justifyContent:'space-between'}}>
                        <h2 >Total:</h2>
                        {
                            editTotal && !editName  ?
                            <div className='horizontalFlex'>
                                <Input id="totalInput" defaultValue={currentTotal} name="budgetName" sx={{width: 100}} placeholder="Budget Total" required></Input>
                                <Button className="button" onClick={totalDone} variant="outlined" style={{fontFamily:'inherit',color:'inherit',marginLeft:'6pt'}}>Done</Button>
                            </div>
                            :
                            <div className='horizontalFlex'>
                                <div style={{fontSize:'15pt'}}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentTotal)}</div>
                                <ModeEditIcon onClick={()=>setEditTotal(true)} style={{display:'inline',fontSize:'18pt', marginLeft:'6pt',marginTop:'3pt'}}></ModeEditIcon>
                            </div>
                        }
                    </div>
                </div>
    
    return(
        <div  className='verticalFlex' style={{marginLeft:'auto',marginRight:'auto',width: '20%', alignItems:'center',justifyContent:'center'}}>
            {nameDisplay}
            {totalDisplay}
            <div className='horizontalFlex' style={{ height:'45%',width:'50%'}}>
                    {
                        Object.keys(currentCategories).map((name,i)=> 
                            <CatCard allowInput={true} initialAmount={currentCategories[name]} key={i} category={name}></CatCard>
                        )
                    }
                </div> 
            <Button className="button" onClick={saveBudget} variant = "outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:"2%"}}>Save Budget</Button>
            <h3 style={{visibility: serverError ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'4%'}}>Server error - budget not saved</h3>
            <h3 style={{visibility: noChanges ? "visible" : "hidden", color:"#f55656", fontWeight:'bolder', fontSize:'xxl', marginTop:'4%'}}>Nothing to save - please make changes first!</h3>
        </div>
    );
}