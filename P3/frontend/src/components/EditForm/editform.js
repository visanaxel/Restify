
import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";

function FlipCard(props) {
    console.log("here")
    console.log(props.data)
    const [owner, setOwner] = useState(false);

    const editItem = () => {

        Axios.patch("http://127.0.0.1:8000/restaurant/menu/" + window.location.pathname.split("/")[2] + "/edit/", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log("rn")
                setOwner(true)
                console.log("2owner:", owner.toString())
            }).catch((error) => {
                console.log(error.response)
               

            });
        console.log("owner:", owner.toString())
        return owner;
        
    }
    return ( 
        <>
       <div id="form-wrapper">
        <form id="add"/>
            <div class="form-group">
              <label for=1/>Item Name</label>
              <input type="text" class="form-control" id=1 placeholder="Edit Item Name"/>
            </div>
            <div class="form-group">
                <label for=4/>Price</label>
                <input type="number" min="1" step="any" class="form-control" id=4 placeholder="Enter price (CAD)"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1"/>Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Description"/></textarea>
              </div>

              <div class="form-group">
                <label for=3>Photo</label>
                <input type="file" class="form-control" placeholder="Enter Description" id=3/>
              </div>
            <div class="button-holder">
                <button type="submit" class="btn btn-secondary" onclick="location.href='../menu/restaurant_page.html'">Save Item</button>
            </div>
          </form>

    </div></>
    );
}

export default FlipCard;