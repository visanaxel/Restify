import React, { useEffect } from "react";
import "../components/Profile/profile.css"
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Card from "../components/Card/card";
import FlipCard from "../components/Card/flip_card";
// import ItemForm from "../components/EditForm/editform";
import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';
import '../components/Card/restaurant_style.css';
import ItemForm3 from "../components/EditForm/editform copy 2";
import ParticlesBg from 'particles-bg'


export const Add = () => {
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

        <div>
            <link rel="stylesheet" href="profile.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <Navbar />
            <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
            <p className="blog">Add Item</p>
            

            <ItemForm3 data={items} />
            <Footer />

        </div>

    )
}

export default Add;