import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import ProfileEdit from '../../pages/Edit_Profile';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ItemForm3 = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [pic, setPic] = useState(null);

    const [picError, setPicError] = useState("");
    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [priceError, setPriceError] = useState("");

    console.log(props.data)
    // let navigate = useNavigate();
    let navigate = useNavigate();

    const makePost = (itemPrice) => {

        const formData = new FormData()

        if (name !== "") {
            formData.append("name", name)
        }
        if (price !== "") {
            console.log(price)
            formData.append("price", price)

        }
        if (desc !== "") {
            formData.append("description", desc)
        }
        if (pic !== null) {
            formData.append("image", pic)
        }
        var valid = true
        
        const data = {
            "name": name,
            "price": price,
            "description": desc,
            "image": pic
        }
        if (name === "") {
            delete data['name']
        }
        if (price === "" || price === undefined || isNaN(price) ) {
            valid = false
            console.log("OK")
            setPriceError("Please enter a valid price.")
            delete data['price']
        }
        if (desc === "") {
            delete data['description']
        }
        if (pic === null) {
            delete data['image']
        } if (parseFloat(price) <= 0) {
            setPriceError("The price must be positive.")
        }
        else {
        
        if (valid) {
        Axios.post("http://127.0.0.1:8000/restaurant/" + window.location.pathname.split("/")[2] + "/menu/add/", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                navigate("/restaurant/"+window.location.pathname.split("/")[2]+ "/menu/")

            }).catch((error) => {
                console.log(error.response)
                setNameError(error.response.data['name'])
                setPicError(error.response.data['image'])
                setDescError(error.response.data['description'])
                setPriceError(error.response.data['price'])

                if (nameError === undefined) {
                    setNameError("") 
                } 
                if (picError === undefined) {
                    setPicError("") 
                } 
                if (descError === undefined) {
                    setDescError("") 
                } 
                if (priceError === undefined) {
                    setPriceError("") 
                } 
              });
            } else {
                setPriceError("Please enter a valid price.")
            }
        }
            return 1;
}


    return (
        <><div className="cus_card" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
            <div className="cus_container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div class="form-group">
                        <label for="pic">Upload Picture</label>
                        <input type="file" class="form-control-file" id="pic" onChange=
                            {e => setPic(e.target.files[0])}  />
                                                    <p style={{color: 'red'}}>{picError}</p>

                        <br></br>
                        <label for="first">Name</label>

                        <input class="form-control" id="name" placeholder="Name" onChange={(e) => {
                            setName(e.target.value);
                        }} /><p style={{color: 'red'}}>{nameError}</p>
                        <br></br>

                        <label for="last">Description</label>

                        <input class="form-control" id="desc" placeholder="Description" onChange={(e) => {
                            setDesc(e.target.value);
                        }} /><p style={{color: 'red'}}>{descError}</p>
                        <br></br>

                        <label for="username">Price</label>

                        <input class="form-control" id="price" placeholder="Price" onChange={(e) => {
                            setPrice(e.target.value);
                        }} /><p style={{color: 'red'}}>{priceError}</p>
                        {/* <p style={{color: 'red'}}>{usernameError}</p> */}
                        <br></br>

                
                        <a href="/profile/" target="_self">
                            <Typography align='center'>
                                <Button type="submit"
                                    onClick={() => { makePost(); }}
                                    
                                    variant="contained" name="foo" value="upvote">Create</Button>
                            </Typography></a>


                    </div>
                </form></div>
        </div></>

    );

}
export default ItemForm3;