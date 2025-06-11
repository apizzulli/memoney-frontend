import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import '../../style/default_styles.css';
import {newUser, email } from '../../Controllers/Requests';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CreateAccount() {
    const navigate = useNavigate();

    useEffect(() => {
        let current = document.getElementById("user").value;
        document.getElementById("user").value = "";
        document.getElementById("password").value = "";
    }, []); 

    // function sendEmail() {
    //     Email.send({
    //         Host: "smtp.gmail.com",
    //         Username: "anthony.pizzulli1@gmail.com",
    //         Password: "SBCS.2022@I",
    //         To: 'antpizzulli11@gmail.com',
    //         From: "anthony.pizzulli1@gmail.com",
    //         Subject: "Test",
    //         Body: "Whoaaaa!!",
    //     })
    //         .then(function (message) {
    //             alert("mail sent successfully")
    //         });
    // }

    async function createAccount(event){
        event.preventDefault();
        
        const userDTO = {
            username: event.currentTarget.user.value,
            password: event.currentTarget.password.value
        };
        const response = await newUser(userDTO);
        if(!response){
            
        }
        localStorage.setItem("jwt",response.token.value);
        localStorage.setItem("userId",response.user.id);
        navigate("/budgets/create");
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error(error));
    }
    async function emailSend(){
        let s = await email();
        return s;
    }
    return(
        <div className="verticalFlex">
            <h2>Enter an email and password for your account below</h2>
                <div style={{width:'15%'}}>
                    <form onSubmit={createAccount}>
                        <Input id="user" name="user" placeholder="Email" required></Input>
                        <Input id="password" type="password" name="password" style={{marginTop:'7%'}} placeholder="Password" required></Input>
                        <Button className="button" type = "submit" variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'10%'}}>Create Account</Button>
                    </form>
                </div>
                <button onClick={emailSend}>Test email</button>
        </div>
    )
}