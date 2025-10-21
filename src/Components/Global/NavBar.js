import "../../style/navbar_style.css";
import "../../style/App.css";

import Button from '@mui/joy/Button';
import { Outlet, Link, Navigate, useNavigate } from "react-router";
import { useState, useContext } from 'react';
import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { BudgetContext } from '../../App.js';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar(){
    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorEl2, setAnchorEl2 ] = useState(null);

    const [ profileAnchor, setProfileAnchor ] = useState(null);

    const { lightMode, setLightMode } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const openTransMenu = (event) => {
        setAnchorEl2(event.currentTarget);
    }

    const closeMenu = (event) => {
        setAnchorEl(null);
    }

    const closeTransMenu = (event) => {
        setAnchorEl2(null);
    }

    function openProfile(event) {
        setProfileAnchor(event.currentTarget);
    }
    
    function closeProfileMenu() {
        setProfileAnchor(null);
    }

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#navBarMenu');
        if (e.target != document.querySelector(".menuItem") && (Boolean(anchorEl) || Boolean(anchorEl2) || Boolean(profileAnchor))) {
            closeMenu();
            closeTransMenu();
            setProfileAnchor(null);
        }
    });

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#profileMenu');
        if (e.target != document.querySelector(".menuItem") && Boolean(profileAnchor)) {
            closeProfileMenu();
        }
    });

    function logout() {
        setProfileAnchor(null);
        setLoggedIn(false);
        localStorage.clear();
        navigate("/");
    }
    const BudgetMenu = () => {
        return (
            <>
                <Menu className="menuBack" anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                    <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeMenu} ><Link to="/budgets/view">View Existing Budgets</Link></MenuItem>
                    <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeMenu}><Link to="/budgets/create">Create New Budget</Link></MenuItem>
                </Menu>
            </>
            );
    }
    const TransactionMenu = () => {
        return(
            <>
                <Menu id="navBarMenu" anchorEl={anchorEl2} open={Boolean(anchorEl2)}  anchorOrigin={{vertical:'bottom'}}>   
                    <MenuItem className="button" style={{fontFamily:'inherit'}} onClick={closeTransMenu} ><Link  to="/transactions">View Existing Transactions</Link></MenuItem>
                    <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeTransMenu}><Link  to="/transactions/add">Add New Transaction</Link></MenuItem>
                </Menu>
            </>
        );
    }
    const ColorSet = () =>{
        return(
            <div className="colorSet">
                {lightMode ? "Light Mode" : "Dark Mode" }
                <ToggleOffIcon onClick={()=>{setLightMode(true)}} style={{marginLeft:'1%',marginRight:'1%',display: lightMode ? 'none': 'block'}}></ToggleOffIcon>
                <ToggleOnIcon onClick={()=>{setLightMode(false)}} style={{marginLeft:'1%',marginRight:'1%',color:'grey',display: lightMode ? 'block' : 'none' }}></ToggleOnIcon>
                <ProfileMenu></ProfileMenu>
            </div>
        );
    }
    const ProfileMenu = () =>{
        return (
            <div>
                <Menu id="profileMenu" anchorEl={profileAnchor} open={Boolean(profileAnchor)}  anchorOrigin={{vertical:'bottom'}}>   
                    <MenuItem className="menuItem" onClick={logout} >Logout</MenuItem>
                </Menu>
            </div>
        );
    }
    return(
            <div className="main-container" >
                <div className={loggedIn ? "nav-buttons" : "nav-buttons"} >
                    <h4 style={{marginLeft: '12px'}}>MEMONEY™</h4>
                    <Button className="button" onClick={()=>{navigate("/")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text">Home</Button>
                    <Button className="button" onClick={openMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Budgets</Button>
                        <BudgetMenu></BudgetMenu>
                    <Button className="button" onClick={openTransMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Transactions</Button>
                        <TransactionMenu></TransactionMenu> 
                </div>
                <div className="horizontal-flex" style={{marginRight:'12px'}}>
                    <ColorSet></ColorSet>
                    <AccountCircleIcon onClick={openProfile} style={{display: loggedIn ? 'flex': 'none'}}></AccountCircleIcon>
                    <ProfileMenu></ProfileMenu>
                </div>
            </div>
    );
}