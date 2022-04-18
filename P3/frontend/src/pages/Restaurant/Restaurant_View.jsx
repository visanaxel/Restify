import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";

import Footer from "../../components/Footer/footer";
import BlogContent from "../../components/Blog_Post/BlogContent";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import { useState } from 'react';
import './restaurant.css';
import Comments from "../../components/Blog_Post/Comments";

import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


// import 'bootstrap/dist/css/bootstrap.min.css';



export const Restaurant_View = () => {

    let navigate = useNavigate();

    console.log("Made it!")

    var text1 = "http://127.0.0.1:8000/restaurant/view/"
    var text2 = useParams()['restId'];
    let text3 = text1.concat(text2);
    let rest_result = text3.concat("/")
    console.log(rest_result)

    var temp1 = "http://127.0.0.1:8000/restaurant/"
    var temp2 = useParams()['restId'];
    let temp3 = temp1.concat(temp2);
    let comment_result = temp3.concat("/view/comments")
    console.log(comment_result)

    const [images, setImages] = useState({});


    const [restaurant, setRestaurant] = useState({});
    const [items, setItems] = useState([]);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");

    function handle() {
        const data = {
            "comment": comment,
        }
        if (comment === "") {
            setCommentError("Please enter a comment")
            return
        }
        var t1 = "http://127.0.0.1:8000/restaurant/"

        let t3 = t1.concat(temp2);
        let t_result = t3.concat("/comment/")
        console.log(comment_result)

        Axios.post(t_result, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(result => result.data)
            .then(data2 => {
                handle2()
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status == 401) {
                        setCommentError("Please login to comment")
                    } else {
                        setCommentError("please fill in comment")
                    };
                } else {
                    console.log('Error', error.message);
                }
            })


    }

    function handle2() {

        axios.get(comment_result).catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                    console.log(comment_result)
                } else {
                    console.log("cry!")
                }

            }

        }).then(result => result.data)
            .then(data2 => {
                setItems(data2['results'])
                console.log(data2)
                setComment("")
                setCommentError("")
            })

    }
    useEffect(() => {
        axios.get(rest_result).catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                } else {
                    console.log("cry!")
                }

            }

        }).then(result => result.data)
            .then(data2 => {
                setRestaurant(data2)
                console.log(data2)

            })

        axios.get(comment_result).catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                    console.log(comment_result)
                } else {
                    console.log("cry!")
                }

            }

        }).then(result => result.data)
            .then(data2 => {
                setItems(data2['results'])
                console.log(data2)
            })

        var img1 = "http://127.0.0.1:8000/restaurant/"
        var img2 = img1.concat(text2)
        var img3 = img2.concat("/view/images/")
        axios.get(img3).catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                    console.log(comment_result)
                } else {
                    console.log("cry!")
                }

            }

        }).then(result => result.data)
            .then(data2 => {
                setImages(data2['results'])
                console.log(data2)
            })


    }, []);

    function unlike() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unlike/restaurant/"
        var temp2 = text2
        var temp3 = temp1.concat(temp2)
        var final = temp3.concat("/")
        axios.delete(final, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
            })
    }

    function like() {
        // Check if user is logged in, by looking at local storage, use token to try and like, 
        var data = {}

        data['rid'] = parseInt(text2)
        const formData = new FormData()
        formData.append("rid", parseInt(text2))

        axios.post("http://127.0.0.1:8000/social/like/restaurant/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).catch(function (error) {
            if (error.response) {
                if (error.response.status == 400) {
                    console.log("HEY")
                    unlike()
                    return
                } else {
                    console.log(error.response.status)
                    alert("you must login to like")
                    return
                }

            }
        })

    }

    function unfollow() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unfollow/"
        var temp2 = text2
        var temp3 = temp1.concat(temp2)
        var final = temp3.concat("/")
        axios.delete(final, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
            })
    }

    function follow() {
        // Check if user is logged in, by looking at local storage, use token to try and like, 
        var data = {}

        data['rid'] = parseInt(text2)
        const formData = new FormData()
        formData.append("rid", parseInt(text2))

        axios.post("http://127.0.0.1:8000/social/follow/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).catch(function (error) {
            if (error.response) {
                if (error.response.status == 400) {
                    console.log("HEY")
                    unfollow()
                    return
                } else {
                    console.log(error.response.status)
                    alert("you must login to follow")
                    return
                }

            }
        })

    }

    function edit () {
        var tempEdit = "/restaurant/edit/"
        navigate(tempEdit.concat(temp2));
    }

    function menu () {
        var tempMenu = "/restaurant/"
        var tempMenu2 = tempMenu.concat(temp2)
        var finalMenu = tempMenu2.concat(/menu/)
        navigate(finalMenu);
    }


    return (
        <>
            <head>
                <title>Restaurant</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="restaurant.css" />
            </head>
            <Navbar />

            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src={restaurant['logo']} alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={restaurant['logo']} alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src={restaurant['logo']} alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            {/* <link rel="stylesheet" href="restaurant.css" />

            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" /> */}


            <div class="card">
                <div class="card-body">
                    <div class="store_logo">
                        <img id="logo" src={restaurant['logo']} alt="restaurant logo" />
                    </div>
                    <h5 class="card-title">{restaurant['name']}</h5>
                    <p>
                        <button type="button" class="btn btn-secondary" onClick={follow}>Follow</button><span> : </span><label>{restaurant['followers']}</label>
                        <button type="button" class="btn btn-secondary" onClick={like}>Like</button><span> : </span><label>{restaurant['likes']}</label>
                    </p>
                    <p class="card-text">Address: {restaurant['address']}</p>
                    <p class="card-text">Postal Code: {restaurant['postal_code']}</p>
                    <p class="card-text">Phone number: {restaurant['phone_number']}</p>


                </div>
            </div>

            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title" onClick={menu}>Menu</h5>
                    </div>
            </div>

            <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Blogs</h5>
                    </div>
            </div>

            <div class="card">
                
                    <div class="card-body" onClick={edit}>
                        <h5 class="card-title">Edit Restaurant</h5>
                    </div>
                
            </div>

            <div class="row title">
                <h1 class="mt-0 mb-0">Comments</h1>
            </div>

            <div class="row comment_post mb-3">
                <form class="col-8">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Add comment</label>
                        <p>{commentError}</p>
                        <textarea value = {comment}class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setComment(e.target.value) }}></textarea>
                    </div>

                    <button type="button" class="btn btn-primary" onClick={handle}>Submit</button>
                </form>
            </div>

            {items.map((item, i) => {
                return (
                    <div class="row comment">
                        <div class="col-8">
                            <div class="row">

                                <div class="col-10 pl-1">
                                    <h5>{item['username']}</h5>
                                    <p>{item['comment']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            })}


        </>
    )
}