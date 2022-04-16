import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import ProfileEdit from '../../pages/Edit_Profile';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [pic, setPic] = useState(null);


    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [picError, setPicError] = useState("");

    let navigate = useNavigate();

    const makePost = () => {

        const formData = new FormData()

        if (firstName !== "") {
            formData.append("first_name", firstName)
        }
        if (lastName !== "") {
            formData.append("last_name", lastName)

        }
        if (email !== "") {
            formData.append("email", email)
        }
        if (phone !== "") {
            formData.append("phone_number", phone)

        }
        if (username !== "") {
            formData.append("username", username)

        }
        if (pic !== null) {
            formData.append("profile_pic", pic)
        }

        
        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone_number": phone,
            "username": username,
            "profile_pic": pic
        }
        if (firstName === "") {
            delete data['first_name']
        }
        if (lastName === "") {
            delete data['last_name']
        }
        if (email === "") {
            delete data['email']
        }
        if (phone === "") {
            delete data['phone_number']
        }
        if (username === "") {
            delete data['username']
        }
        console.log(data)

        Axios.patch("http://127.0.0.1:8000/users/edit/", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                

                navigate('/profile')
            }).catch((error) => {
                console.log(error.response)
                setUsernameError(error.response.data['username'])
                setEmailError(error.response.data['email'])
                setPicError(error.response.data['profile_pic'])
                if (emailError === undefined) {
                    setEmailError("") 
                } 
                if (usernameError === undefined) {
                    setUsernameError("") 
                } 
                if (picError === undefined) {
                    setPicError("") 
                } 
                console.log("Error:", error);
              });

    }


    return (
        <><div className="cus_card">
            <div className="cus_container">
                <form action="http://127.0.0.1:8000/users/edit/" method="post" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div class="form-group">
                        <label for="pic">Upload Profile Picture</label>
                        <input type="file" class="form-control-file" id="pic" onChange=
                            {e => setPic(e.target.files[0])}  />
                                                    <p style={{color: 'red'}}>{picError}</p>

                        <br></br>
                        <label for="first">First Name</label>

                        <input class="form-control" id="first" placeholder="First Name" onChange={(e) => {
                            setFirstName(e.target.value);
                        }} />
                        <br></br>

                        <label for="last">Last Name</label>

                        <input class="form-control" id="last" placeholder="Last Name" onChange={(e) => {
                            setLastName(e.target.value);
                        }} />
                        <br></br>

                        <label for="username">Username</label>

                        <input class="form-control" id="last" placeholder="Username" onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <p style={{color: 'red'}}>{usernameError}</p>
                        <br></br>

                        <label for="email">Email</label>

                        <input class="form-control" id="email" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <p style={{color: 'red'}}>{emailError}</p>
                        <br></br>

                        <label for="phone">Phone</label>

                        <input class="form-control" id="phone" placeholder="Phone" onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                        <br></br>


                        <a href="/profile/" target="_self">
                            <Typography align='center'>
                                <Button type="submit"
                                    onClick={() => { makePost(); }}
                                    
                                    variant="contained" name="foo" value="upvote">Submit</Button>
                            </Typography></a>


                    </div>
                </form></div>
        </div></>

    );

}
export default EditProfile;