import React, { useEffect } from "react";
import "../components/Profile/profile.css"
import Navbar from "../components/Navbar/navbar";
import Button from "@material-ui/core/Button";

import Footer from "../components/Footer/footer";
import Card from "../components/Card/card";
import FlipCard from "../components/Card/flip_card";
import axios from 'axios';
import Axios from 'axios';
import { useState } from 'react';
import '../components/Card/restaurant_style.css';
import AddItem from "../components/Card/card_add";
import Typography from "@material-ui/core/Typography";


export const Menu = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000" + window.location.pathname + "?page=" + page, {

        }
        ).then(result => result.data)
            .then(data2 => {
                
                setItems(data2['results']);
                console.log(data2['results'])
            }).catch((error) => {
                console.log(error.response)


            });
    }, [page]);

    // const updateItems = (page_num) => {
    //     console.log('called')
    //     setPage(page_num)
    //     axios.get("http://127.0.0.1:8000" + window.location.pathname + "?page=" + page, {

    //     }
    //     ).then(result => result.data)
    //         .then(data2 => {
    //             console.log(data2)
    //             console.log("RIGHT ABOVE")
    //             setItems(data2['results']);
    //         })
    //     }
    

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
            <p className="blog">Menu</p>

            {items.map((item, i) => {
                return (
                    <><div class="card-deck"><FlipCard data={item} /></div></>
                )

            })}

            <Typography align='center'>
                <Button value="prev" variant="contained" onClick={() => setPage(page - 1)} />
                <Button value="next" variant="contained" onClick={() => setPage(page + 1)} />
                <AddItem /></Typography>




            <br></br>

            <Footer />

        </div></>

    )
}

export default Menu;