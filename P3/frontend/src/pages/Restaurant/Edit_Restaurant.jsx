import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";

import Footer from "../../components/Footer/footer";
import BlogContent from "../../components/Blog_Post/BlogContent";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import { useState } from 'react';
import './blog2.css';
import Comments from "../../components/Blog_Post/Comments";

import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Edit_Restaurant = () => {


    var text1 = "http://127.0.0.1:8000/restaurant/edit/"
    var text2 = useParams()['restId'];
    let text3 = text1.concat(text2);
    let rest_result = text3.concat("/")

    const [name, setName] = useState("");
    const [postal_code, setPostal_Code] = useState("");
    const [logo, setLogo] = useState(null);
    const [address, setAddress] = useState("");
    // ADD PHONE NUMBER!

    let navigate = useNavigate();

    const handle = () => {
        console.log("MADE IT TO HANDLE!")
        console.log(rest_result)
        const formData = new FormData()

        if (name !== "") {
            formData.append("name", name)
        }
        if (postal_code !== "") {
            formData.append("postal_code", postal_code)
        }
        if (logo !== null) {
            formData.append("logo", logo)
        }
        if (address !== "") {
            formData.append("address", address)
        }

        Axios.patch(rest_result, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                var navi = "/restaurant/"
                navi.concat()
                navigate(navi.concat(text2));
            }).catch((error) => {

            });
    }

    return (
        <>
        
        <head>
                <title>Blog</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
                <link rel="stylesheet" href="blog2.css" />
            </head>
            {/* <Navbar /> */}

                    <div class="container-fluid">
                        
                        <div class="row title">
                            <div class="col-4">

                            </div>
                            <form>
                                <div class="form-group">
                                <label class = "mb-0" for="exampleInputPassword1"><h1>Restaurant Logo</h1></label>

                                    <input  type="file" class="form-control-file mt-0" id="exampleFormControlFile1" onChange=
                            {e => setLogo(e.target.files[0])} />
                                    <label class = "mb-0" for="exampleInputPassword1"><h1>Title</h1></label>
                                    <div class="row">
                                        <div class="col-10 mr-0">
                                            <input class="form-control" id="exampleInputPassword1" placeholder="Type Name" onChange={(e) => {
                            setName(e.target.value);
                        }} />
                                                            <label class = "mb-0" for="exampleInputPassword1"><h1>Address</h1></label>

                         <input class="form-control" id="exampleInputPassword1" placeholder="Type Adresss" onChange={(e) => {
                            setAddress(e.target.value);
                        }} />
                                                            <label class = "mb-0" for="exampleInputPassword1"><h1>Postal Code</h1></label>

                         <input class="form-control" id="exampleInputPassword1" placeholder="Type postal code" onChange={(e) => {
                            setPostal_Code(e.target.value);
                        }} />
                                        </div>
                                        <div class="col-5">
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary" onClick={handle}>Submit</button>

                            </form>
                        </div>
                        
                        {/* <div class="row text_body">
                            
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Example text area</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="15" cols="140" onChange={(e) => {
                            setContent(e.target.value);
                        }}></textarea>
                                    <button type="submit" class="btn btn-primary" onClick={handle}>Submit</button>
                                </div>
                            

                        </div> */}

                        <hr />

                    </div>


            <Footer />


        </>
        
    )

}