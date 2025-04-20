import "../../style/navbar_style.css";
import Button from '@mui/joy/Button';
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
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
    const [ profileAnchor, setProfileAnchor ] = useState(null);

    const { lightMode, setLightMode } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = (event) => {
        setAnchorEl(null);
    }

    function openProfile(event) {
        setProfileAnchor(event.currentTarget);
    }
    
    function closeProfileMenu() {
        setProfileAnchor(null);
    }

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#navBarMenu');
        if (e.target != document.querySelector(".menuItem") && Boolean(anchorEl)) {
            closeMenu();
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

    const ProfileMenu = () =>{
        return (<div>
            <Menu id="profileMenu" anchorEl={profileAnchor} open={Boolean(profileAnchor)}  anchorOrigin={{vertical:'bottom'}}>   
                <MenuItem className="menuItem" onClick={logout} >Logout</MenuItem>
            </Menu>
        </div>);
    }
    return(
            <div  className="horizontalFlex" style={{display:'flex',width:'100%', height:'5%', borderBottom: '.02rem solid', borderBottomColor:'white',justifyContent:'space-between'}}>
                <div className="horizontalFlex" style={{visibility: loggedIn ? 'visible' : 'hidden', marginLeft:'.25%'}}>
                    <Button onClick={()=>{navigate("/")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text">Home</Button>
                    <Button onClick={()=>{navigate("/calendar-view")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text" href="/calendar-view"> Calendar</Button>
                    <Button onClick={openMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Budgets</Button>
                    <Menu id="navBarMenu" anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                        <MenuItem className="menuItem" onClick={closeMenu} ><Link style={{color:'black'}} to="/budgets/view">View Existing Budgets</Link></MenuItem>
                        <MenuItem className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/budgets/create">Create New Budget</Link></MenuItem>
                        <MenuItem  className="menuItem" onClick={closeMenu}><Link style={{color:'black'}} to="/transactions">Transactions</Link></MenuItem>
                    </Menu>
                </div>
                <div style={{display:'flex', flexDirection:'row',fontSize:'12pt',marginRight:'1.5%',width:'15%', justifyContent:'flex-end'}}>
                    {lightMode ? "Light Mode" : "Dark Mode" }
                    <ToggleOffIcon onClick={()=>{setLightMode(true)}} style={{marginLeft:'3%',display: lightMode ? 'none': 'block'}}></ToggleOffIcon>
                    <ToggleOnIcon onClick={()=>{setLightMode(false)}} style={{marginLeft:'3%',color:'grey',display: lightMode ? 'block' : 'none' }}></ToggleOnIcon>
                    <AccountCircleIcon onClick={openProfile} style={{marginLeft:'6%',visibility: loggedIn ? 'visible' : 'hidden'}}></AccountCircleIcon>
                    <ProfileMenu></ProfileMenu>
                </div>
            </div>
    );
}