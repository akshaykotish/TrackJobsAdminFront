import './Login.css';
import  { Redirect } from 'react-router-dom'
import Logo from '../../assets/images/ui_related/minilogo.png';
import { useState } from 'react';

const Login = ()=>{

    const [contact, update_contact] = useState("");
    const [password, update_password] = useState("");

    function check91(e){
        var contact = document.getElementById("Contact");
        if(!contact.value.startsWith("+91"))
        {
            contact.value = "+91" + contact.value;
        }
    }

    function Login_Now(){
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://trackjobsadmin.us-east-2.elasticbeanstalk.com/Security/Login", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;

                if(response != "Not")
                {
                    document.cookie = "name="+ response;
                    window.location.replace("/Departments");
                }
                else{
                    alert("Access not allowed");
                }
            }
        };

        var information = {
            "Contact" : contact,
            "Password" : password,
        }

        xhttp.send(JSON.stringify(information));

    }


    function onContactChange(e){
        update_contact(e.target.value);
    }

    function onPasswordChange(e){
        update_password(e.target.value);
    }


    return (
        <>
        <div className="mainbox">
            <div className="leftbox">
            <div className="TitleBox">login into your<br/><h3>admin account</h3></div>
                <div className="SizeBox"></div>
                <div className="SizeBox"></div>
                <div className="FormBox">
                    <h5>contact</h5>
                    <input id="Contact" value={contact} type="text" placeholder="+91912345-12345" onChange={onContactChange} onClick={check91}></input>
                    <br/><br/>
                    <h5>password</h5>
                    <input id="Password" value={password} type="password" placeholder="password" onChange={onPasswordChange} ></input>
                    <br/><br/>
                    <button onClick={Login_Now}>login</button>
                </div>
            </div>
            <div className="rightbox">
                <img className="Logo" src={Logo}></img>
            </div>
        </div>
        </>
    );
}

export default Login;