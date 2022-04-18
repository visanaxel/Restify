import './notification.css';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import NotifCard from '../../components/NotifCard/NotifCard';
import ParticlesBg from 'particles-bg'

export const RestNotif = () => {

    const [data, setData] = useState([]);
    const [pic, setPic] = useState([])

    useEffect(() => {
        Axios.get("http://127.0.0.1:8000/notifications/owner/", 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(result => result.data)
        .then(json => {
            //console.log(json);

            for (var i = 0; i < json['results'].length; i++) {
                //console.log('HI');
                Axios.get("http://127.0.0.1:8000/restaurant/view/" + json['results'][i]['rid'] + "/")
                .then(result => result.data)
                .then(data2 => {
                    var temp = pic.slice();
                    setPic(temp => [...temp, data2['logo']]);
                    console.log(i);
                });
            }
            //console.log(json);
            setData(json);
        })
        .catch((error) => {
            setData(['false']);
            //console.log(error);
        });
        console.log('i fire once');

    }, []);

    if (data !== [] && pic !== []) {
        console.log(pic);
        //console.log(pic !== []);
        return (
            <>
                <Navbar></Navbar>
                <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
                {(data.toString() !== 'false') ? <NotifCard data={data} pic={pic}></NotifCard> : <h2 style={{textAlign: 'center'}}> You do not own a restaurant.</h2>}

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Footer></Footer>
            </>
        );
    }
}