import '../../pages/SearchResult/search.css';
import React, { useState, useEffect, useParams } from 'react';

function SearchBar() {

    const [input, setInput] = useState(''); // '' is the initial state value

    return (
        <>
        <div id="search">
            <div className="search_bar">
                <div className="input-group">
                    <input id="search_thing" type="search" className="form-control rounded" placeholder="Search Restaurants"
                        aria-label="Search" aria-describedby="search-addon" value={input} onInput={e => setInput(e.target.value)} />
                    <a href={input ? "http://localhost:3000/search/" + input : "http://localhost:3000/home"} target="_self">
                    <button type="button" className="btn abc btn-outline-primary" style={{backgroundColor: 'grey', color: 'black', borderColor: 'transparent'}}> search</button>
                    </a>
                </div>
            </div>
        </div>
        </>
    );
}

export default SearchBar;