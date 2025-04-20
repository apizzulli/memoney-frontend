import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import '../../style/calendar_style.css';
import { useState, useEffect } from 'react';
import CakeIcon from '@mui/icons-material/Cake';
import Modal from '@mui/joy/Modal';
import BirthdayModal from './BirthdayModal';
import { MONTHS } from './CalendarView';

export default function CalendarTile({date, month, ordinal}) {
    const[ name, setName ] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(false);
    const[modalVisible, setModalVisible] = useState(false);
    let help = false;
    const handleClick = () => {
        setModalVisible(true);
        setHovered(false);
    }

    return(
        <div onMouseDown={handleClick}class="calendar-tile" onMouseOut={()=>setHovered(false)}onMouseOver={()=> setHovered(true)} onMouseLeave={()=> setHovered(false)}
            style={{backgroundColor: hovered ? 'rgb(80, 99, 125)' : 'rgb(39, 48, 61)', 
                    display: ((month==MONTHS.FEBRUARY || month==MONTHS.APRIL || month==MONTHS.JUNE || month==MONTHS.SEPTEMBER || month==MONTHS.NOVEMBER)&& date==31) ||(month == MONTHS.FEBRUARY && date==30) ||(month == MONTHS.FEBRUARY && date==29) ? 'none' : 'flex'
                }}
            >
            <CakeIcon style={{float:'left',marginRight:'7%',height:'25%', width:'25%', display: name != null ? 'flex' : 'none'}}></CakeIcon>
            <h1 >{date}</h1>
            <Modal open={modalVisible}><BirthdayModal name={name} setName={setName} month={month} date={date} ordinal={ordinal} dateSelected={{selected, setSelected}} closeModal={setModalVisible}></BirthdayModal></Modal>
        </div>
    )
}