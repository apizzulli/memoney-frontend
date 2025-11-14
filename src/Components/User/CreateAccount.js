import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import '../../style/default_styles.css';
import {newUser, email } from '../../Controllers/UserController.js';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { BudgetContext } from '../../App.js';

export default function CreateAccount() {
    const navigate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState("");
    const { userId, setUserId } = useContext(BudgetContext);
    const { loggedIn, setLoggedIn } = useContext(BudgetContext);

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
        if(userDTO.username == ""){
            setErrorMessage("Email is required.");
            await sleep(3000);
            setErrorMessage("");
            return;
        }
        if(userDTO.password == ""){
            setErrorMessage("Password is required.");
            await sleep(3000);
            setErrorMessage("");
            return;
        }
        const response = await newUser(userDTO);
        if(response.status == "304"){
            setErrorMessage("A user already exists with the given email. Navigate to the login page." );
            await sleep(3000);
            setErrorMessage("");
            return;
        }
        else if(response.status != '201'){
            setErrorMessage("Server error");
            await sleep(3000);
            setErrorMessage("");
            return;
        }
        setUserId(response.user.id);
        setLoggedIn(true);
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
        <div id="vertical-flex" style={{rowGap:'5%'}}>
            <h2>Enter an email and password for your account below</h2>
                <div id="vertical-flex" style={{width:'100%'}}>
                    <form style={{width:'15%'}} onSubmit={createAccount}>
                        <Input id="user" name="user" placeholder="Email"></Input>
                        <Input id="password" type="password" placeholder="Password" name="password" style={{marginTop:'7%'}}></Input>
                        <Button className="button" type = "submit" variant="outlined" style={{fontFamily:'inherit',color:'inherit', marginTop:'12%'}}>Create Account</Button>
                    </form>
                <span style={{color:'red', display: errorMessage != "" ? 'flex' : 'none', marginTop:'1%',marginBottom:'1%'}}>{errorMessage}</span>
                </div>
        </div>
    )
}