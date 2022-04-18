import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";

function Card(props) {

   console.log("HEre")
   console.log(props.data['username'])

    return (<>
        <div className="cus_card" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
            <div className="cus_container" >
                <img src={props.data['profile_pic']} className="img-author" alt="Avatar" />
                

                <div className="profile_box">
                
                <p className="title_post2">{props.data['first_name']} {props.data['last_name']}</p>
                <p align="center">Username: {props.data['username']}</p>
                <p align="center">Email: <a href={"mailto:" + props.data['email']}>{props.data['email']}</a></p>
                <p align="center">Phone: <a href={"tel:" + props.data['phone_number']}>{props.data['phone_number']}</a></p>
                </div>
                <br></br>
                <Typography align='center'>
                    <Button variant="contained" component={Link} to="/profile_edit/">Edit Profile</Button>
                </Typography>
                <br></br>
                <br></br>
                
            </div>
        </div></>

    );
}

export default Card;