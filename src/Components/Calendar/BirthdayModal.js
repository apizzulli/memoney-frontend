import '../../style/birthday_modal_style.css';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState, useEffect } from 'react';
import CakeIcon from '@mui/icons-material/Cake';

function Birthday(name, date) {
    this.name = name;
    this.date = date;
}

export default function BirthdayModal(props) {
    const [birthdayCreated, setBirthdayCreated] = useState(false);
    const [ displayError, setDisplayError ] = useState(false);
    let ordinals = "";
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/home`).then(results => results.json()).then(data => {
        console.log("data=" + data);
      });
    });

    function handleSubmit(event) {
        const firstName = event.currentTarget.form.name.value;
        if(event.currentTarget.form.name.value === "")
            setDisplayError(true);
        else{
            props.setName(firstName);
            props.dateSelected.setSelected(true);    
            fetch(`http://127.0.0.1:5000/create-birthday`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new Birthday(firstName, props.date))
            }).then(
                response => response.json()).then(
                    data => console.log(data));
        }
    }

    return(   
        <div class="new-birthday-wrapper">
            <div style={{width:'100%'}}><CancelIcon onClick={()=>props.closeModal(false)} style={{float:'right', marginRight:'5px',marginTop:'5px'}}></CancelIcon> </div>
            <div style={{display: props.name === null ? 'block': 'none'}}>
                <form class="modal-form">
                    <h1>Fill out information</h1>
                    <div class="input-wrapper" > 
                        <Input name="name" sx={{width: 300, marginBottom: '3%', helperText:"A name is required."}} placeholder="Name" error={displayError} required></Input>
                        <Input sx={{width: 300, marginBottom: '3%'}} placeholder="Note"> </Input>
                        <Input sx={{width: 300, marginBottom: '3%'}} placeholder="Reminder"> </Input>
                        <Button onClick={handleSubmit} sx={{width: 100, marginBottom: '3%', display: props.name === null ? 'block': 'none', marginTop:'6%'}} variant = "plain">Create</Button>
                        <h3 style={{display: props.name === null ? 'none': 'block'}}>Birthday Created!</h3>
                    </div>
                </form>
            </div>
            <div class="birthday-info" style={{display: props.name === null ? 'none': 'flex'}}>
                <h2>{props.month} {props.date}{props.ordinal}</h2>
                <h2>{props.name}'s Birthday</h2>

                <CakeIcon></CakeIcon>
            </div> 
        </div>
    );
}