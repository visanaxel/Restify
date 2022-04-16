import React, { useState } from 'react';
import './home.css';
// import logo from './../../../public/logo.png'
// const logo = require('./logo.png');


function Search () {

    return (
        <>
        <div id="search">
        <link rel='stylesheet' href='./home.css'/>
            <div className="search_row">
                <img id="logo" height="200" src='https://raw.githubusercontent.com/ChunKaiC/chunkaic.github.io/main/logo.png' alt="restify logo"/>
                <div><label id="slogan" >amplify your restaurant experience</label></div>
                <div className="input-group" id="search_bar">
                    <input id="search_thing" type="search" className="form-control rounded" placeholder="Search Restaurants"
                        aria-label="Search" aria-describedby="search-addon" />


                    <a href="../search_page/search.html" target="_self">
                        <button type="button" className="btn btn-outline-primary">search</button>
                    </a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Search;