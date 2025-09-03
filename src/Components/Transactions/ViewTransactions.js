import { useState,useContext, useEffect } from 'react';
import '../../style/default_styles.css';
import '../../style/components.css';

import Button from '@mui/joy/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Delete, Shop } from '@mui/icons-material';
import { BudgetContext } from '../../App.js';
import { pickIcon } from '../Global/CatCard.js';
import { getTransactions, deleteTransaction } from '../../Controllers/TransactionController.js';
import Modal from '@mui/material/Modal';

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function ViewTransactions() {

    const { lightMode } = useContext(BudgetContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ transactions, setTransactions ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).transactions);//);.sort((a, b) => new Date(a.date) - new Date(b.date));
    const [ remainingVals, setRemainingVals ] = useState(JSON.parse(localStorage.getItem("remainingVals")));
    const budgetName = useState(JSON.parse(localStorage.getItem("selectedBudget")).name);
    const [ remaining, setRemaining ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).remaining);
    const [ total, setTotal ] = useState(JSON.parse(localStorage.getItem("selectedBudget")).total);
    const [open, setOpen] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const handleClose = () => setOpen(false);
    const view=()=>{
        let j = JSON.parse(localStorage.getItem("selectedBudget")).remaining;
        console.log("hi");
    }

    const dateStr = (date) => { 
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };
    useEffect(() => {
        console.log("useEffect view trans");
        let budgetId = JSON.parse(localStorage.getItem("selectedBudget")).id;
        let currentTransactions = null;
        const fetchData = async () => {
            currentTransactions = await getTransactions(budgetId);
            console.log("here");
            if(transactions){
                setTransactions(currentTransactions);
            }
        }
        fetchData();
        let k = localStorage.getItem("selectedBudget");
        let budget = null;
        if(k)
            budget = JSON.parse(k);
        let spent = budget.total - budget.remaining;
        let per = spent/budget.total * 100;
        console.log("hi");
    },[]); 

    function showDelete(trans){
        setToDelete(trans);
        setOpen(true);
    }

    async function deleteTransaction(){ 
        let result = await deleteTransaction(toDelete.id);
        setOpen(false);
        navigate("/transactions/view");
        // handleOpen();
    }
    return(
        <div>
            <div onClick={view} style={{display:'flex', flexDirection:'column', alignItems:'center',width:'100%', height:'100%',rowGap:'5%'}}>
                <h1>{budgetName}</h1>
                <div className="horizontalFlex" style={{height:'5%',alignItems:'center', justifyContent:'center',width:'60%'}}>
                    <div className="tooltip" style={{borderWidth:'.02px',border:'solid',borderRight:'none',backgroundColor:'red',width:`${total-remaining}%`}}>
                        <span className='tooltiptext'>{Math.round((total-remaining)/total*100)}% Spent</span>
                    </div>
                    {/* {style={{borderWidth:'.02px',border:'solid',borderLeft:'none',backgroundColor:'green',width:`${remaining}%`}}} */}
                    <div className='tooltip' style={{borderWidth:'.02px',border:'solid',borderRight:'none',backgroundColor:'green',width:`${remaining > 0 ? remaining : 0}%`}}>
                        <span  className='tooltiptext'>{Math.round((remaining/total)*100)}% Remaining</span>
                    </div>
                </div>
                <h3 style={{marginTop:'1%'}}>{USDollar.format(remaining)} Remaining</h3>
                {
                    transactions != undefined && transactions.length > 0? 
                    <div className='verticalFlex' style={{height:'30%', width:'100%'}}>
                        <h2>Transactions:</h2>  
                        <div  style={{height:'100%'}}>
                            <div className="" style={{marginBottom:'3%',display:'grid',gridTemplateColumns: "repeat(3, 1fr)",alignItems:'center',backgroundColor:'rgb(39, 48, 61)',height:'8%'}}>
                                    <div >Date</div>
                                    <div >Type</div>
                                    <div >Amount</div>
                            </div>
                            
                                {transactions.sort((a, b) => new Date(a.date) - new Date(b.date)).map((trans) => 
                                    <div className='horizontalFlex'>    
                                        <div className="" style={{width:'100%',marginBottom:'2%',display:'grid',gridTemplateColumns: "repeat(3, 1fr)",alignItems:'center',backgroundColor:'rgb(39, 48, 61)',height:'8%'}}>
                                            <div >{dateStr(trans.date)}</div>
                                            <div >{pickIcon(trans.category)}</div>
                                            <div >{" -" + USDollar.format(trans.amount)}</div>
                                        </div>
                                        <div ><Delete onClick={()=>showDelete(trans)}></Delete></div>
                                    </div>
                                )}
                            
                        </div>
                        <h3 style={{marginTop:'1%'}}>Total Spent: {USDollar.format(total - remaining)}</h3>
                    </div>
                    :
                    <h2>No Transactions to Display</h2>
                }
                <Button className="button" variant="outlined" onClick={()=>navigate("/transactions/add")} style={{marginTop:'1%',fontFamily:'inherit',color:'inherit'}}>New Transaction</Button>
            </div>
            <Modal 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                        <div style={{top:'50%',left:'50%',transform: 'translate(-50%, -50%)',position:'absolute',backgroundColor:'rgb(39, 48, 61)',color:'white',height:'15%', width:'15%',borderRadius: '15px'}}>
                            <div className='verticalFlex' style={{fontSize:'xxl',height:'100%', width:'100%', marginLeft:'auto',marginRight:'auto',color:'white'}}>
                                <span style={{textAlign:'center'}}>Are you sure you want to delete this transaction?</span>
                                <div className='horizontalFlex' style={{marginTop:'5%',columnGap:'10%', color:'white'}}>
                                    <Button onClick={deleteTransaction} variant='outlined' className='button' style={{color:'inherit'}}>Yes</Button>
                                    <Button onClick={()=>setOpen(false)} variant='outlined' className='button' style={{color:'inherit'}}>No</Button>
                                </div>
                            </div>
                        </div>
                </Modal>
        </div>
    );
}