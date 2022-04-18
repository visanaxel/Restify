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
import UserCard from '../../components/NotifCard/UserCard';

export const UserNotif = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState('http://127.0.0.1:8000/notifications/user/');

    useEffect(() => {
        Axios.get(next, 
        {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}})
        .then(result => result.data)
        .then(json => {
            //console.log(json);

            // for (var i = 0; i < json['results'].length; i++) {
            //     //console.log('HI');
            //     Axios.get("http://127.0.0.1:8000/restaurant/view/" + json['results'][i]['rid'] + "/")
            //     .then(result => result.data)
            //     .then(data2 => {
            //         var temp = pic.slice();
            //         setPic(temp => [...temp, data2['logo']]);
            //         console.log(i);
            //     });
            // }
            //console.log(json);
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

    if (data !== [] ) {
        //console.log(pic);
        //console.log(pic !== []);
        console.log(data.toString())
        return (
            <>
                <Navbar></Navbar>
                <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
                    
                <br></br>
                {(data.toString() !== 'false') ? <UserCard data={data}></UserCard> :  <><br></br><br></br><br></br><h1 style={{textAlign: 'center'}}> Please log in to see user notifications.</h1></>}

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