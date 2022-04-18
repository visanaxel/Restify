import React, { useEffect } from "react";
import "../components/Profile/profile.css"
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import EditProfile from "../components/Card/card_edit"
import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';
import ParticlesBg from 'particles-bg'


export const ProfileEdit = () => {
    const [data, setData] = useState({});

    
    

    return (
        <div>
            <link rel="stylesheet" href="../Profile/profile.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <Navbar />
            <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
            <p className="blog">Profile</p>
            

            <EditProfile data={data}/>
            <Footer />
            <p>{data['email']}</p>

        </div>
    )
}

export default ProfileEdit;