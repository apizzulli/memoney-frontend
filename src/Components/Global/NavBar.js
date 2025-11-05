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
import MenuIcon from '@mui/icons-material/Menu';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
const StyledListHeader = styled(ListSubheader)({
  backgroundColor: 'rgb(80, 99, 125)',
  color:'white',
  fontSize: '14pt',
});
export default function NavBar(){
    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorEl2, setAnchorEl2 ] = useState(null);
    const [ hamAnchor, setHamAnchor ] = useState(null);

    const [ profileAnchor, setProfileAnchor ] = useState(null);

    const { lightMode, setLightMode } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const openTransMenu = (event) => {
        setAnchorEl2(event.currentTarget);
    }

    const openHamMenu = (event) => {
        setHamAnchor(event.currentTarget);
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

    function closeHamMenu() {
        setHamAnchor(null);
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
    const HamburgerMenu = () => {
        return (
            <div>
                <Button>Test Button</Button>
            </div>
            // <>
            //     <Menu className="hamburger-menu" anchorEl={hamAnchor} open={Boolean(hamAnchor)}  anchorOrigin={{vertical:'left'}}>
            //         <div style={{ borderBottom: '2px white'}}> 
            //             <StyledListHeader style={{fontFamily:'inherit'}}>Budgets</StyledListHeader>
            //             <MenuItem style={{fontFamily:'inherit'}}>View All</MenuItem>
            //             <MenuItem style={{fontFamily:'inherit'}}>Create New</MenuItem>
            //         </div>   
            //         <StyledListHeader>Transactions</StyledListHeader>
            //         <MenuItem>Add</MenuItem>
            //     </Menu>
            // </>
        );
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
    // const SideDrawer = () => {
    //     return (
    //         <Drawer color="inherit" open={Boolean(hamAnchor)} anchor="left" >
    //             <div className="side-menu">
    //                 <Button className="button" onClick={()=>{navigate("/")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text">Home</Button>

    //                 <Button className="button" onClick={openMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Budgets</Button>
                    
    //                 <Button className="button"style={{fontFamily:'inherit',color:'inherit', backgroundColor:'inherit'}} onClick={closeMenu} ><Link to="/budgets/view">View Existing</Link></Button>
    //                 <Button  className="button" style={{fontFamily:'inherit',color:'inherit', backgroundColor:'inherit'}} onClick={closeMenu}><Link to="/budgets/create">Create New</Link></Button>

    //                 <Button className="button" onClick={openTransMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Transactions</Button>
    //                     <TransactionMenu></TransactionMenu> 
    //             </div>
    //         </Drawer>
    //     );
    // }
    return(
            <div className="main-container" >
                {/* <div className="hamburger-menu">
                    <MenuIcon onClick={openHamMenu}></MenuIcon>
                </div> */}
                {/* <SideDrawer></SideDrawer> */}
                <div className={loggedIn ? "nav-buttons" : "nav-buttons"} >
                    <h4 className="title" onClick={()=>{navigate("/about")}} style={{marginLeft: '12px', cursor:'pointer'}}>MEMONEY™</h4>
                    <Button className="button" onClick={()=>{navigate("/")}} style={{fontFamily:'inherit',color:'inherit'}} variant="text">Home</Button>
                    <Button className="button" onClick={openMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Budgets</Button>
                    <Menu className="menuBack" anchorEl={anchorEl} open={Boolean(anchorEl)}  anchorOrigin={{vertical:'bottom'}}>   
                        <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeMenu} ><Link to="/budgets/view">View Existing Budgets</Link></MenuItem>
                        <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeMenu}><Link to="/budgets/create">Create New Budget</Link></MenuItem>
                    </Menu>
                    <Button className="button" onClick={openTransMenu} style={{fontFamily:'inherit',color:'inherit'}}  variant="text" >Transactions</Button>
                    <Menu id="navBarMenu" anchorEl={anchorEl2} open={Boolean(anchorEl2)}  anchorOrigin={{vertical:'bottom'}}>   
                        {/* <MenuItem className="button" style={{fontFamily:'inherit'}} onClick={closeTransMenu} ><Link  to="/transactions">View Existing Transactions</Link></MenuItem> */}
                        <MenuItem className="menuItem" style={{fontFamily:'inherit'}} onClick={closeTransMenu}><Link  to="/transactions/add">Create New Transaction</Link></MenuItem>
                    </Menu>
                </div>
                <div className="horizontal-flex" >
                    <ColorSet></ColorSet>
                    <AccountCircleIcon onClick={openProfile} style={{display: loggedIn ? 'flex': 'none'}}></AccountCircleIcon>
                    <ProfileMenu></ProfileMenu>
                </div>
            </div>
    );
}