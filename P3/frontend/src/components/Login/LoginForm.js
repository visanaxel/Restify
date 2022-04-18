import React from "react";
import {useState} from "react";
import Axios from 'axios';
import  { useNavigate  } from 'react-router-dom';


const LoginForm = () => {

    let navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    function handle2() {
      navigate('/register/');
    }

    function handle() {
        const data = {
            "username": email,
            "password": password   
          }
        
          Axios.post("http://127.0.0.1:8000/users/login/", data).catch(function (error) {
            if (error.response) {
              if (error.response.status == 400) {
                  setError("Please fill both fields")
              } else {
                setError("Invalid credentials")
              };
            } else { 
              console.log('Error', error.message);
            }
          })
          .then(result => result.data)
          .then(data2 => {
            setError("")
            
            console.log(data2['access'])
            localStorage.setItem('token', data2['access'])
            localStorage.setItem('user', JSON.stringify(data2.data))
            navigate('/profile/');
          })
    }

    return (<>
        <form class="form-container">
            <h1>Welcome to Restify</h1>
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter Username" 
                    value={email} 
                    onChange={(e) => {setEmail(e.target.value)}} />
                
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}} />
            </div>

            <p>{error}</p>

            <button type="button" class="btn btn-success btn-block" onClick={handle}>Login</button>
            <br />
             
            <button type="button" class="btn btn-success btn-block" onClick={handle2}>Register</button>




        </form>
    </>)

}

export default LoginForm;

