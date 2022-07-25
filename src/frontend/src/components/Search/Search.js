import React, { useState } from 'react';
import '../../pages/Home/Home.css';
// import logo from './../../../public/logo.png'
// const logo = require('./logo.png');


function Search () {

    const [input, setInput] = useState(''); // '' is the initial state value
    

    return (
        <>
        <div id="search">
            <div className="search_row">
                <img id="logo" height="200" src='https://raw.githubusercontent.com/ChunKaiC/chunkaic.github.io/main/logo.png' alt="restify logo"/>
                <div><label id="slogan" style={{color: 'white'}} >amplify your restaurant experience</label></div>
                <div className="input-group" id="search_bar">
                    <input id="search_thing" type="search" className="form-control rounded" placeholder="Search Restaurants"
                        aria-label="Search" aria-describedby="search-addon" value={input} onInput={e => setInput(e.target.value)}/>


                    <a href={input ? "http://localhost:3000/search/" + input : "http://localhost:3000/home"} target="_self">
                        <button type="button" className="btn btn-outline-primary" >search</button>
                    </a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Search;