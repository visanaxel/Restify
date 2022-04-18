import './Home.css';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import Search from "../../components/Search/Search";
import ResultCard from '../../components/ResultCard/ResultCard';
import ParticlesBg from 'particles-bg'

export const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/restaurant/search/?query=', {method: 'GET'})
        .then(response => {
            //console.log('Hi');
            return response.json();
        })
        .then(json => {
            //console.log(json);
            setData(json);
        });
    }, [])

    if (data !== []) {

        console.log(data);

        return (
            <>
                <div>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                        crossOrigin="anonymous"></script>
                    <link rel='stylesheet' href='./Home.css'/>
                </div>

                <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
    
                <Navbar></Navbar>
    
                <Search></Search>
    
                <div class="card-body">
                    <h4>Top Restaurants</h4>
                </div>

                <ResultCard data={data}></ResultCard>
    
                <Footer></Footer>
    
            </>
        );

    }
    
}