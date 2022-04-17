import React, { useEffect } from "react";
import "../components/Profile/profile.css"
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Card from "../components/Card/card";
import FlipCard from "../components/Card/flip_card";
import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';
import '../components/Card/restaurant_style.css';


export const Menu = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/restaurant/1/menu/", {
            
        }
        ).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                console.log(data2['results'])
                setItems(data2['results']);
                console.log(data2['results'].length)
            })

    }, []);



    return (

        <><div>
            <link rel="stylesheet" href="../components/Card/restaurant_style.css" />
            <title>Menu</title>

            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <Navbar />
            <Edit/>

            <Footer />

        </div></>

    )
}

export default Menu;