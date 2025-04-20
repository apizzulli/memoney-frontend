import Menu, { MenuPaper } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function CategoryForm({savedCategories, saveCategories}) {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ menuItem, setMenuItem ] = useState("Select");

    function Category(name, amount){
        this.name = name;
        this.amount = amount;
    }

    const CATEGORIES ={
        GROCERY: "Grocery",
        DISCR: "Discretionary",
        SAVINGS: "Savings",
        PHONE: "Phone",
        INTERNET: "Internet"
    }

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#categoryForm');
        if (e.target != document.querySelector(".menuItem") && Boolean(anchorEl)) {
            setAnchorEl(null);
        }
    });

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const menuClick = (chosenCategory) => {
        setMenuItem(chosenCategory);
        setAnchorEl(null);
    }

    const addCategory = (event)=> {
        const amount = event.currentTarget.catAmount.value;
        event.target.reset();
        event.preventDefault();
        let newCat = new Category(menuItem, amount);
        let newCats = [...savedCategories];
        newCats.push(newCat);
        saveCategories(newCats);
        setMenuItem("Select");
    }
    const editView = Object.keys(savedCategories).map(
                        (name)=>(
                        <div style={{display:'flex'}}>
                            <Input defaultValue={name} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
                            <Input defaultValue={savedCategories[name]+"$"} type="text" name="catAmount" sx={{width:200, height: 20}} required></Input>
                            <DeleteIcon></DeleteIcon>
                        </div>
                    ));
    return(
        <div style={{width: '100%'}}>
            <Menu id="categoryMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>   
                {Object.keys(CATEGORIES).map((name,i)=><MenuItem id="menuItem" onClick={()=>menuClick(CATEGORIES[name])}>{CATEGORIES[name]}</MenuItem>)}
            </Menu>
            <div style={{display: 'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <h3>{"Name: "+menuItem}</h3>
                    <ArrowDropDownIcon style={{display: anchorEl === null ? 'block': 'none'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                    <ArrowDropUpIcon style={{display:anchorEl === null ? 'none': 'block'}}onClick={handleMenuClose}></ArrowDropUpIcon>
                </div>
            </div>
            <form onSubmit={addCategory} style={{width:'100%', display:'flex', columnGap:'5%', justifyContent:'center',alignItems:'center'}}>
                <Input type="text" name="catAmount" sx={{width:200, height: 20}} placeholder="Amount" required></Input>
                <Button variant = "outlined" style={{fontFamily:'inherit',color:'inherit'}} type="submit">Done</Button>
            </form>
        </div>
    );
}
                    