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
import ParticlesBg from 'particles-bg'


export const Menu = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000" + window.location.pathname + "?page=" + page, {

        }
        ).then(result => result.data)
            .then(data2 => {
                if (data2['next'] === null) {
                    setNext(false)
                } else {
                    setNext(true)
                }
                if (data2['previous'] === null) {
                    setPrev(false)
                } else {
                    setPrev(true)
                }
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

    var result = items.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/3)
      
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
    }, [])
    

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
            <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
            <p className="blog">Menu</p>

            {result.map((sub, i) => {
                return (
                    <><div class="card-deck">

                        {sub.map( (element, j) => {
                            
                            return <FlipCard data={element} />;

                        })}
                        
                    </div></>
                );

            })}

            <Typography align='center'>
                {(prev ? <Button marginRight='50' value="prev" variant="contained" onClick={() => setPage(page - 1)}>Previous</Button> : <div></div>)}
                {((prev && next) ? <div style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> : <p></p>)}
                {(next ? <Button value="next" variant="contained" onClick={() => setPage(page + 1)}>Next</Button> : <div></div>)}
                <br></br><br></br>
                <AddItem /></Typography>




            <br></br>

            <Footer />

        </div></>

    )
}

export default Menu;