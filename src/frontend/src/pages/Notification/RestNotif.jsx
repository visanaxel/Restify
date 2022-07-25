import './notification.css';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import NotifCard from '../../components/NotifCard/NotifCard';
import ParticlesBg from 'particles-bg'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const RestNotif = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState('http://127.0.0.1:8000/notifications/owner/');

    useEffect(() => {
        Axios.get(next, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(result => result.data)
        .then(json => {
            setData(json);
            setNext(json['next']);
            setPrev(json['previous']);
        })
        .catch((error) => {
            setData(['false']);
            //console.log(error);
        });
        console.log('i fire once');

    }, [page]);

    if (data !== []) {
        return (
            <>
                <Navbar></Navbar>
                <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />

                <br></br>

                {(data.toString() !== 'false') ? <NotifCard data={data}></NotifCard> :  <><br></br><br></br><br></br><h1 style={{textAlign: 'center'}}> You do not own a restaurant.</h1></>}

                <Typography align='center'>
                {((prev !== null) ? <Button marginRight='50' value="prev" variant="contained" onClick={() => {setPage(page - 1); setNext(prev)}}>Previous</Button> : <div></div>)}
                {(((prev !== null) && (next !== null)) ? <div style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> : <p></p>)}
                {((next !== null && (data.toString() !== 'false')) ? <Button value="next" variant="contained" onClick={() => setPage(page + 1)}>Next</Button> : <div></div>)}
                </Typography>

                <br></br>
                <br></br>


                <Footer></Footer>
            </>
        );
    }
}