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



export const Restaurant_View = () => {
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



    const [restaurant, setRestaurant] = useState({});
    const [items, setItems] = useState([]);
    const [comment, setComment] = useState("");

    function handle () {
        
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





    }, []);

    return (
        <>
            <head>
                <title>Restaurant</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="restaurant.css" />
            </head>
            {/* <Navbar /> */}
            {/* <link rel="stylesheet" href="restaurant.css" />

            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" /> */}

            <img id="logo" src={restaurant['logo']} alt="restaurant logo" />

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{restaurant['name']}</h5>
                    <p>
                        <button type="button" class="btn btn-secondary">Follow</button><span> : </span><label>{restaurant['followers']}</label>
                        <button type="button" class="btn btn-secondary">Likes</button><span> : </span><label>{restaurant['likes']}</label>
                    </p>
                    <p class="card-text">Address: {restaurant['address']}</p>
                    <p class="card-text">Postal Code: {restaurant['postal_code']}</p>
                    <p class="card-text">Phone number: {restaurant['phone_number']}</p>


                </div>
            </div>

            <div class="card">
                <a href="../menu/restaurant_page.html">
                    <div class="card-body">
                        <h5 class="card-title">Menu</h5>
                    </div>
                </a>
            </div>

            <div class="card">
                <a href="../rest_blog/Blog.html">
                    <div class="card-body">
                        <h5 class="card-title">Blogs</h5>
                    </div>
                </a>
            </div>

            <div class="card">
                <a href="../add_edit_restaurant/add_edit_restaurant.html">
                    <div class="card-body">
                        <h5 class="card-title">Edit Restaurant</h5>
                    </div>
                </a>
            </div>

            <div class="row title">
            <h1 class="mt-0 mb-0">Comments</h1>
        </div>

        <div class="row comment_post mb-3">
            <form class="col-8">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Add comment</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
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