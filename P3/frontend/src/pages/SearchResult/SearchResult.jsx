import './search.css';
import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import Search from "../../components/Search/Search";
import SearchBar from "../../components/Search/SearchBar";
import { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import Axios from 'axios';
export const SearchResult = () => {

    var query = useParams()['query'];

    const [items, setItems] = useState([]);


    useEffect(() => {
        axios.post("http://127.0.0.1:8000/restaurant/search/?query=" + query).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                console.log(data2['results'])
                setItems(data2['results']);
                console.log(data2['results'].length)
            })
    }, []);

    return (
        <>
            <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossOrigin="anonymous"></script>
            </div>

            <Navbar></Navbar>

            <SearchBar></SearchBar>

            <Footer></Footer>
        </>
    );
}