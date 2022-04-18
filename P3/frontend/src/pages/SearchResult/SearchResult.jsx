import './search.css';
import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/Search/SearchBar";
import Button from "@material-ui/core/Button";

import ResultCard from '../../components/ResultCard/ResultCard';

import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import axios from 'axios';
import Axios from 'axios';
import MapCard from '../../components/ResultCard/MapCard';
import Typography from "@material-ui/core/Typography";


export const SearchResult = () => {

    var query = useParams()['query'];

    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState('http://127.0.0.1:8000/restaurant/search/?query=' + query + '&page=' + page);

    //console.log(url)

    useEffect(() => {
        fetch(next, {method: 'GET'})
        .then(response => {
            //console.log('Hi');
            return response.json();
        })
        .then(json => {
            console.log(json);
            setData(json);
            setNext(json['next']);
            setPrev(json['previous']);
        });
    }, [page])

    if (data !== []) {
        //console.log(data)
        return (
            <>
                <div>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                        crossOrigin="anonymous"></script>
                    <link rel='stylesheet' href='./Search.css'/>
                </div>

                <Navbar></Navbar>

                <SearchBar></SearchBar>

                <div class="card-body">
                    <h4>Results</h4>
                </div>

                <MapCard data={data}></MapCard>
                <Typography align='center'>
                {((prev !== null) ? <Button marginRight='50' value="prev" variant="contained" onClick={() => {setPage(page - 1); setNext(prev)}}>Previous</Button> : <div></div>)}
                {(((prev !== null) && (next !== null)) ? <div style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> : <p></p>)}
                {((next !== null) ? <Button value="next" variant="contained" onClick={() => setPage(page + 1)}>Next</Button> : <div></div>)}
                </Typography>
                <br></br><br></br>

                <Footer></Footer>
            </>
        );
    }
}