import './notification.css';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import NotifCard from '../../components/NotifCard/NotifCard';

export const UserNotif = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/notifications/user/", 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(result => result.data)
        .then(json => {
            console.log(json);
            setData(json);})
        .catch((error) => {
            setData(['false']);
            console.log(error);
        })
    }, []);

    if (data !== []) {
        return (
            <>
                <Navbar></Navbar>
                {(data.toString() !== 'false') ? <NotifCard data={data}></NotifCard> : <h1> Please log in to see user notifications.</h1>}

                <Footer></Footer>
            </>
        );
    }
}