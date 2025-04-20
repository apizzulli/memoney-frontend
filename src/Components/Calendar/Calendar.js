import CalendarTile from "./CalendarTile";
import '../../style/calendar_style.css';
import { useState, useContext } from 'react';
import Modal from '@mui/joy/Modal';
import BirthdayModal from "./BirthdayModal";

export default function Calendar(props) {
    const [thirtyOneDays, setThirtyOneDays] = useState(true);
    const[modal, toggleModal] = useState(false);
  
    return(
        <div>
            <div>
                <div class="tile-container">
                    <CalendarTile month={props.month} date={1} ordinal={"1st"}></CalendarTile>
                    <CalendarTile month={props.month} date={2} ordinal={"nd"}></CalendarTile>
                    <CalendarTile month={props.month} date={3} ordinal={"rd"}></CalendarTile>
                    <CalendarTile month={props.month} date={4} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={5} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={6} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={7} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={8} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={9} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={10} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={11} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={12} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={13} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={14} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={15} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={16} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={17} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={18} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={19} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={20} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={21} ordinal={"st"}></CalendarTile>
                    <CalendarTile month={props.month} date={22} ordinal={"nd"}></CalendarTile>
                    <CalendarTile month={props.month} date={23} ordinal={"3rd"}></CalendarTile>
                    <CalendarTile month={props.month} date={24} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={25} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={26} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={27} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={28} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={29} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={30} ordinal={"th"}></CalendarTile>
                    <CalendarTile month={props.month} date={31} ordinal={"st"} ></CalendarTile>
                </div>
            </div> 
        </div>
    )
}