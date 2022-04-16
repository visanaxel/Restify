import React from "react";
import { useState } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [first_nameError, setFirst_nameError] = useState("");
    const [last_nameError, setLast_nameError] = useState("");
    const [phone_numberError, setPhone_numberError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [usernameError, setUsernameError] = useState("");

    function handle() {
        const data = {
            "username": username,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password2": password2,
            "phone_number": phone_number
          }
        
          Axios.post("http://127.0.0.1:8000/users/register/", data).catch(function (error) {
            if (error.response) {
              if (error.response.status == 400) {
                    console.log(error.response.data)
                    console.log("hey")
                    var emailValue = error.response.data["email"];
                    var usernameValue = error.response.data["username"];
                    var passwordValue = error.response.data["password"];
                    var password2Value = error.response.data["password2"];
                    var phone_numberValue = error.response.data["phone_number"];
                    var first_nameValue = error.response.data["first_name"];
                    var last_nameValue = error.response.data["last_name"];
                    var password_dont_mach = error.response.data["error"];

                   

                    if (emailValue != undefined) {
                        emailValue = error.response.data["email"][0];
                    } else {
                        emailValue=""
                    }
                    if (usernameValue != undefined) {
                        usernameValue = error.response.data["username"][0];
                    } else {
                        usernameValue=""
                    }
                    if (passwordValue != undefined) {
                        passwordValue = error.response.data["password"][0];
                    } else {
                        passwordValue=""
                    }
                    if (password2Value != undefined) {
                        password2Value = error.response.data["password2"][0];
                    } else {
                        password2Value=""
                    }
                    if (phone_numberValue != undefined) {
                        phone_numberValue = error.response.data["phone_number"][0];
                    } else {
                        phone_numberValue = ""
                    }
                    if (first_nameValue != undefined) {
                        first_nameValue = error.response.data["first_name"][0];
                    } else {
                        first_nameValue = "";
                    }
                    if (last_nameValue != undefined) {
                        last_nameValue = error.response.data["last_name"][0];
                    } else {
                        last_nameValue = ""
                    }

                    if (password_dont_mach != undefined) {
                        password2Value = error.response.data["error"];
                    } else {
                        password2Value=""
                    }

                    setEmailError(emailValue);
                    setPasswordError(passwordValue);
                    setFirst_nameError(first_nameValue);
                    setLast_nameError(last_nameValue);
                    setPassword2Error(password2Value);
                    setPhone_numberError(phone_numberValue);
                    setUsernameError(usernameValue);
              } else {
                // setError("Invalid credentials")
                console.log("cry")
              };
            } else { 
              console.log('Error', error.message);
            }
          })
          .then(result => result.data)
          .then(data2 => {
            console.log(data2)
            navigate('/login/');
          })
    }
    

    return (
        <form class="form-container">
            <h1>Register</h1>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email} 
                onChange={(e) => {setEmail(e.target.value)}}/>
                            <p>{emailError}</p>

            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input type="name" class="form-control" id="username" placeholder="Username"
                value={username} 
                onChange={(e) => {setUsername(e.target.value)}}/>
                <p>{usernameError}</p>
            </div>

            <div class="form-group">
                <label for="phone_number">Phone number</label>
                <input type="phone_number" class="form-control" id="phone_number" placeholder="647-416-9983"
                value={phone_number} 
                onChange={(e) => {setPhone_number(e.target.value)}}/>
                <p>{phone_numberError}</p>
            </div>

            <div class="form-group">
                <label for="first_name">First name</label>
                <input type="name" class="form-control" id="exampleInputPassword1" placeholder="First name"
                value={first_name} 
                onChange={(e) => {setFirst_name(e.target.value)}}/>
                <p>{first_nameError}</p>
            </div>

            <div class="form-group">
                <label for="name">Last name</label>
                <input type="name" class="form-control" id="exampleInputPassword1" placeholder="Last name"
                value={last_name} 
                onChange={(e) => {setLast_name(e.target.value)}}/>
                <p>{last_nameError}</p>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <p>{passwordError}</p>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password"
                value={password2} 
                onChange={(e) => {setPassword2(e.target.value)}}/>
                <p>{password2Error}</p>
            </div>

            {/* <div class="form-group">
                <label for="exampleInputPassword1">Upload Profile Picture</label>
                <input type="" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div> */}

            <button type="button" class="btn btn-success btn-block" onClick={handle}>Register</button>


        </form>

    )

}

export default RegisterForm;
