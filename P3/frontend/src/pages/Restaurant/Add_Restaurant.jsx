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

import { useNavigate } from 'react-router-dom';

export const Add_Restaurant = () => {
    const [name, setName] = useState("");
    const [postal_code, setPostal_Code] = useState("");
    const [logo, setLogo] = useState(null);
    const [address, setAddress] = useState("");
    const [phone_number, setPhoneNumber] = useState("");

    const [rid, setRid] = useState("")

    const [nameError, setNameError] = useState("");
    const [postal_codeError, setPostal_CodeError] = useState("");
    const [logoError, setLogoError] = useState(null);
    const [addressError, setAddressError] = useState("");
    const [phone_numberError, setPhoneNumberError] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/users/profile/", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }
    ).then(result => result.data)
        .then(data2 => {
            if (data2['is_owner']) {
                console.log("SEEEE THIS!!!!")
                var temp1 = "http://127.0.0.1:8000/restaurant/"
                var temp2 = data2['id']
                var temp3 = temp1.concat(temp2)
                var final = temp3.concat("/GetUserRest/")
                axios.get(final).then(result => result.data)
                .then(data2 => {
                    var rid = data2['rid']
                    navigate('/restaurant/'.concat(rid))
                })
            }
        })

    }, []);
    

    const handle = () => {

        

        console.log("MADE IT TO HANDLE!")
        // console.log(rest_result)
        const formData = new FormData()
        var flag = false
        if (name == "") {
            setNameError("Please enter a name")
            flag = true
        }
        if (postal_code == "") {
            setPostal_CodeError("Please enter Postal Code")
            flag = true

        }
        if (logo == null) {
            setLogoError("Please insert logo")
            flag = true


        }
        if (address == "") {
            setAddressError("Please add address")
            flag = true
        }

        if (phone_number == "") {
            setPhoneNumber("Please add phone number")
            flag = true
        }

        if (flag) {
            return
        }
        formData.append("name", name)
        formData.append("postal_code", postal_code)
        formData.append("logo", logo)
        formData.append("address", address)
        formData.append("phone_number", phone_number)



        Axios.post("http://127.0.0.1:8000/restaurant/add/", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                var navi = "/restaurant/"
                navigate(navi.concat(data2['id']));
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
            <Navbar />

            <div class="container-fluid">

                <div class="row title">
                    <div class="col-4">

                    </div>
                    <form>
                        <div class="form-group">
                            <label class="mb-0" for="exampleInputPassword1"><h1>Restaurant Logo</h1></label>

                            <input type="file" class="form-control-file mt-0" id="exampleFormControlFile1" onChange=
                                {e => setLogo(e.target.files[0])} />
                            <label class="mb-0" for="exampleInputPassword1"><h1>Name</h1></label>
                            <div class="row">
                                <div class="col-10 mr-0">
                                    <input class="form-control" id="exampleInputPassword1" placeholder="Type Name" onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                                    <p>{nameError}</p>
                                    <label class="mb-0" for="exampleInputPassword1"><h1>Address</h1></label>

                                    <input class="form-control" id="exampleInputPassword1" placeholder="Type Adresss" onChange={(e) => {
                                        setAddress(e.target.value);
                                    }} />
                                    <p>{addressError}</p>

                                    <label class="mb-0" for="exampleInputPassword1"><h1>Postal Code</h1></label>

                                    <input class="form-control" id="exampleInputPassword1" placeholder="Type postal code" onChange={(e) => {
                                        setPostal_Code(e.target.value);
                                    }} />
                                    <p>{postal_codeError}</p>

                                    <label class="mb-0" for="exampleInputPassword1"><h1>Phone Number</h1></label>

                                    <input class="form-control" id="exampleInputPassword1" placeholder="Phone number" onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                    }} />
                                    <p>{phone_numberError}</p>
                                </div>
                                <div class="col-5">
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={handle}>Submit</button>

                    </form>
                </div>



                <hr />

            </div>


            <Footer />


        </>

    )

}