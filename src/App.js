import logo from './logo.svg';
import './style/App.css';
import NavBar from './Components/Global/NavBar.js';
import CalendarView from './Components/Calendar/CalendarView.js';
import CreateAccount from './Components/User/CreateAccount.js';
import Transactions from './Components/Transactions/ViewTransactions.js';
import AddTransactions from './Components/Transactions/AddTransaction.js';
import HomeScreen from './Components/HomeScreen.js';
import Login from './Components/User/Login.js';
import CreateBudget from './Components/Budget/CreateBudget.js';
import ViewBudgets from './Components/Budget/ViewBudgets.js';
import EditBudget from './Components/Budget/EditBudget.js';
import BudgetDetails from './Components/Budget/BudgetDetails.js';
import {Routes, Route} from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export const BudgetContext = createContext();      

function App() {
  const navigate = useNavigate();
  const [ budgets, setBudgets ] = useState([]);
  const [ userId, setUserId ] = useState();
  const [ loggedIn, setLoggedIn ] = useState(localStorage.getItem("userId"));
  const [ lightMode, setLightMode ] = useState(false);

  useEffect(() => {
    if(window.location.href.includes("createAccount"))
      return; 
    if(!localStorage.getItem("jwt")){
      localStorage.clear();
      navigate("/login", {state: {message: "Session expired, please log in again."}});
      return;
    }
    let token = jwtDecode(localStorage.getItem("jwt"));
    let exp = token.exp.toString();
    let now = Date.now();
    if(token && token.exp < Date.now() / 1000){
       localStorage.clear();
        navigate("/login", {state: {message: "Session expired, please log in again."}});
        return;
    }
  }, []); 

  return (
        <BudgetContext.Provider value={{loggedIn, setLoggedIn, lightMode, setLightMode, budgets, setBudgets, userId, setUserId}}>
          <div className= {lightMode ? "App-light" : "App-dark"} >
            <NavBar></NavBar> 
            <Routes>
              <Route path = "/" element = {<HomeScreen/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/calendar-view" element={<CalendarView/>}></Route>
              <Route path="/budgets/create" element={<CreateBudget/>}></Route>
              <Route path="/budgets/edit" element={<EditBudget/>}></Route>
              <Route path="/budgets/view" element={<ViewBudgets/>}></Route>
              <Route path="/createAccount" element={<CreateAccount/>}></Route>
              <Route path="/budgetDetails" element={<BudgetDetails/>}></Route>
              <Route path="/transactions" element={<Transactions/>}></Route>
              <Route path="/transactions/add" element={<AddTransactions/>}></Route>
            </Routes>
          </div>
        </BudgetContext.Provider>
  );
}

export default App;
