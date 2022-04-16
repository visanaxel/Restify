import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import ProfileEdit from '../../pages/Edit_Profile';
import { Link } from 'react-router-dom';

export const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");

    const makePost = () => {


        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone_number": phone,
            "username": username
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

        Axios.patch("http://127.0.0.1:8000/users/edit/", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
            }).catch((error) => {
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
                        <input type="file" class="form-control-file" id="pic" />
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
                        <br></br>

                        <label for="email">Email</label>

                        <input class="form-control" id="email" placeholder="Email" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
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
                                    component={Link} to="/profile"
                                    variant="contained" name="foo" value="upvote">Submit</Button>
                            </Typography></a>


                    </div>
                </form></div>
        </div></>

    );

}
export default EditProfile;