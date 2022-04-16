import React, { useEffect } from "react";
import "../components/Profile/profile.css"
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Card from "../components/Card/card"
import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';


export const ProfileView = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/profile/", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }
    ).then(result => result.data)
        .then(data2 => {
            setData(data2);
            console.log(data2)
        })

    }, []);
    

    return (
        <div>
            <link rel="stylesheet" href="profile.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <Navbar />
            <p className="blog">Profile</p>
            

            <Card data={data}/>
            <Footer />
            <p>{data['email']}</p>

        </div>
    )
}

export default ProfileView;