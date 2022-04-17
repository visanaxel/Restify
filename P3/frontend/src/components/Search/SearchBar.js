import React, { useState, useEffect, useParams } from 'react';


function SearchBar() {
    return (
        <>
        <div id="search">
            <div className="search_bar">
                <div className="input-group">
                    <input id="search_thing" type="search" class="form-control rounded" placeholder="Search Restaurants"
                        aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="btn btn-outline-primary" onClick="" >search</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default SearchBar;