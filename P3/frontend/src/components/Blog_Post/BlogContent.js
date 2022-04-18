import React, { useEffect } from "react";

import axios from 'axios';
import { useState } from 'react';

const BlogContent = (props) => {
    console.log(props.blog['title'])
    const [liker, setLiker] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
       
        const formData = new FormData()
        formData.append("bid", props.blog['id'])

        axios.post("http://127.0.0.1:8000/social/like/blog/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).then(result => result.data)
        .then(data2 => {
            console.log("uhoh!")
            if (likes == 0) {
            }
            unlike()
        }).catch(function (error) {
            if (error.response.status == 400) {
                
                // unlike()
                setLiker(true)
                
            } else {
                console.log(error.response.status)
                
            }
        })
        UpdateLikesFollows()

    }, []);

    function UpdateLikesFollows () {
        
        axios.get("http://127.0.0.1:8000/blog/"+ props.blog['id']+"/view/")
        .then(result => result.data)
        .then(data2 => {
            setLikes(data2['likes'])
            console.log(data2)

        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                } else {
                    console.log("cry!")
                }

            }

        })
    }

    function unlike() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unlike/blog/"
        var temp2 =  props.blog['id']
        var temp3 = temp1.concat( props.blog['id'])
        var final = temp3.concat("/")
        
        axios.delete(final, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                setLiker(false)
                UpdateLikesFollows();
            });

    }

    function like() {
        // Check if user is logged in, by looking at local storage, use token to try and like, 
        var data = {}

        const formData = new FormData()
        formData.append("bid",  props.blog['id'])

        axios.post("http://127.0.0.1:8000/social/like/blog/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        )
        .then(data2 => {
            console.log(data2)
            setLiker(true)
            UpdateLikesFollows()
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status == 400) {
                    console.log("HEY")
                    //unlike()

                    return
                } else {
                    console.log(error.response.status)
                    alert("you must login to like")
                    return
                }

            }
        })
        setLiker(true)
        UpdateLikesFollows()
        console.log(likes)
    }

    // function handle2() {
    //     console.log("HEYO")
    //     var temp1 = "http://127.0.0.1:8000/social/unlike/blog/"
    //     var temp2 = props.blog['bid']
    //     var temp3 = temp1.concat(temp2)
    //     var final = temp3.concat( "/")
    //     axios.delete(final, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(result => result.data)
    //     .then(data2 => {
    //         console.log(data2)
    //     })
    // }

    // function handle() {
    //     // Check if user is logged in, by looking at local storage, use token to try and like, 
    //     var data = {}
    //     console.log(parseInt(props.blog['bid']))
    //     data['bid'] = parseInt(props.blog['bid'])
    //     console.log(data)
    //     const formData = new FormData()
    //     formData.append("bid", parseInt(props.blog['bid']))

    //     axios.post("http://127.0.0.1:8000/social/like/blog/", formData,{headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
    //     ).catch(function (error) {
    //         if (error.response) {
    //             if (error.response.status == 400) {
    //                 console.log("HEY")
    //                 handle2()
    //                 return
    //             } else {
    //                 alert("you must login to like")
    //                 return
    //             }

    //         }
    //     })
        
    // }   

    return (
        <>
             <div class="row mt-0" id="store2_logo">
                    <img id="rest2logo" src={props.blog['image']}/>
            </div>

            <div class="row title">
                <h1 class="mt-0 mb-0">{props.blog['title']}</h1>

            </div>
            <div class="row title">
                <h5 class="mt-0 mb-0">{props.blog['date'].slice(0, 10)}</h5>
            </div>

            <div class="row title">
                <h5 class="">Likes: {likes}</h5>
            </div>

            <div class="row title">
            {(liker) ?  <button type="button" class="like btn btn-primary" onClick={unlike}>Liked!</button> : <button type="button" class="like btn btn-primary" onClick={like}>Like</button>}

            </div>

            <hr/> 

            <div class="row text_body">
                    <p>{props.blog['content']}</p>

            </div>

                <hr></hr>
        </>
    )
}

export default BlogContent;
