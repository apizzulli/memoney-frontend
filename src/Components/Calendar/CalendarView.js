import { useState, useContext, createContext } from "react";
import '../../style/calendar_style.css';
import '../../style/default_styles.css';
import Calendar from './Calendar.js';
import BirthdayModal from './BirthdayModal.js';
import Modal from '@mui/joy/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const MONTHS = {
    JANUARY: "January",
    FEBRUARY : "February",
    MARCH : "March",
    APRIL : "April",
    MAY : "May",
    JUNE : "June",
    JULY : "July",
    AUGUST : "August",
    SEPTEMBER : "September",
    OCTOBER : "October",
    NOVEMBER : "November", 
    DECEMBER : "December"
}

export default function CalendarView () {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(MONTHS.JANUARY);
    let open = Boolean(anchorEl);

    const handleMonthSelect = (event) => {
        let month = event.currentTarget.innerText;
        if( month==="April" || month==="June" || month==="September" || month==="November"){
            //setThirtyOneDays(false);
        }
        setSelectedMonth(month);
        setAnchorEl(null);
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget.parentElement);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    window.addEventListener('mouseup', function(e) {
        var x = document.querySelector('#categoryForm');
        if (e.target != document.querySelector(".menuItem") && Boolean(anchorEl)) {
            setAnchorEl(null);
        }
    });

    return(
        <div className="verticalFlex">
            <h2 class="title" style={{marginTop:'1%'}} >Calendar View
            </h2>
            <div className="horizontalFlex">
                <h1>{selectedMonth}</h1>
                <Menu anchorEl={anchorEl} open={open}>   
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.JANUARY} onClick={(event)=>handleMonthSelect(event)}>January</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.FEBRUARY} onClick={(event)=>handleMonthSelect(event)}>February</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.MARCH} onClick={(event)=>handleMonthSelect(event)}>March</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.APRIL} onClick={(event)=>handleMonthSelect(event)}>April</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.MAY} onClick={(event)=>handleMonthSelect(event)}>May</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.JUNE} onClick={(event)=>handleMonthSelect(event)}>June</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.JULY} onClick={(event)=>handleMonthSelect(event)}>July</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.AUGUST} onClick={(event)=>handleMonthSelect(event)}>August</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.SEPTEMBER} onClick={(event)=>handleMonthSelect(event)}>September</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.OCTOBER} onClick={(event)=>handleMonthSelect(event)}>October</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.NOVEMBER} onClick={(event)=>handleMonthSelect(event)}>November</MenuItem>
                    <MenuItem id="menuItem" selected={selectedMonth===MONTHS.DECEMBER} onClick={(event)=>handleMonthSelect(event)}>December</MenuItem>
                </Menu>
                    <div>
                        <ArrowDropDownIcon style={{display:anchorEl ? 'none': 'block'}}onClick={handleMenuOpen}></ArrowDropDownIcon>
                        <ArrowDropUpIcon style={{display:anchorEl ? 'block': 'none'}}onClick={()=>setAnchorEl(null)}></ArrowDropUpIcon>
                    </div>
            </div>
            <div style={{display: selectedMonth===MONTHS.JANUARY ? 'block': 'none'}}><Calendar month={MONTHS.JANUARY}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.FEBRUARY ? 'block': 'none'}}><Calendar month={MONTHS.FEBRUARY}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.MARCH ? 'block': 'none'}}><Calendar month={MONTHS.MARCH}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.APRIL ? 'block': 'none'}}><Calendar month={MONTHS.APRIL}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.MAY ? 'block': 'none'}} ><Calendar month={MONTHS.MAY}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.JUNE ? 'block': 'none'}} ><Calendar month={MONTHS.JUNE}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.JULY ? 'block': 'none'}} ><Calendar month={MONTHS.JULY}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.AUGUST ? 'block': 'none'}}><Calendar month={MONTHS.AUGUST}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.SEPTEMBER ? 'block': 'none'}}><Calendar month={MONTHS.SEPTEMBER}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.OCTOBER ? 'block': 'none'}}> <Calendar month={MONTHS.OCTOBER}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.NOVEMBER ? 'block': 'none'}}> <Calendar month={MONTHS.NOVEMBER}></Calendar></div>
            <div style={{display: selectedMonth===MONTHS.DECEMBER ? 'block': 'none'}}><Calendar month={MONTHS.DECEMBER}></Calendar></div>
        </div>
    );
}