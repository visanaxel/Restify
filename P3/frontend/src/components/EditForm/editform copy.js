import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import ProfileEdit from '../../pages/Edit_Profile';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ItemForm2 = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [pic, setPic] = useState(null);

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

        
        const data = {
            "name": name,
            "price": price,
            "description": desc,
            "image": pic
        }
        if (name === "") {
            delete data['name']
        }
        if (price === "" || price === undefined) {
            delete data['price']
        }
        if (desc === "") {
            delete data['description']
        }
        if (pic === null) {
            delete data['image']
        }
        console.log(data)
        
        
        Axios.patch("http://127.0.0.1:8000/restaurant/menu/" + window.location.pathname.split("/")[2] + "/edit/", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                navigate("/restaurant/"+data2['rid']+ "/menu/")

            }).catch((error) => {
                console.log(error.response)
                console.log("Error:", error);
              });
              return 1;
}


    return (
        <><div className="cus_card">
            <div className="cus_container">
                <form action="http://127.0.0.1:8000/users/edit/" method="post" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <div class="form-group">
                        <label for="pic">Upload Picture</label>
                        <input type="file" class="form-control-file" id="pic" onChange=
                            {e => setPic(e.target.files[0])}  />
                                                    {/* <p style={{color: 'red'}}>{picError}</p> */}

                        <br></br>
                        <label for="first">Name</label>

                        <input class="form-control" id="name" placeholder="Name" onChange={(e) => {
                            setName(e.target.value);
                        }} />
                        <br></br>

                        <label for="last">Description</label>

                        <input class="form-control" id="desc" placeholder="Description" onChange={(e) => {
                            setDesc(e.target.value);
                        }} />
                        <br></br>

                        <label for="username">Price</label>

                        <input class="form-control" id="price" placeholder="Price" onChange={(e) => {
                            setPrice(e.target.value);
                        }} />
                        {/* <p style={{color: 'red'}}>{usernameError}</p> */}
                        <br></br>

                
                        <a href="/profile/" target="_self">
                            <Typography align='center'>
                                <Button type="submit"
                                    onClick={() => { makePost(); }}
                                    
                                    variant="contained" name="foo" value="upvote">Save</Button>
                            </Typography></a>


                    </div>
                </form></div>
        </div></>

    );

}
export default ItemForm2;