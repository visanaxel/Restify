import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import SideBar from "../../components/Blog_Post/Sidebar";
import Footer from "../../components/Footer/footer";
import BlogContent from "../../components/Blog_Post/BlogContent";
import Comments from "../../components/Blog_Post/Comments";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import { useState } from 'react';
import './blog.css';



export const Blog_Post = () => {
    console.log("Made it!")
    var text1 = "http://127.0.0.1:8000/blog/"
    var text2 = useParams()['blogId'];
    let text3 = text1.concat(text2);
    let result = text3.concat("/view/")
    console.log(result)

    const [blog, setBlog] = useState({});


    useEffect(() => {
        axios.get(result).catch(function (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    console.log("404!")
                } else {
                    console.log("cry!")
                }

            }
        }).then(result => result.data)
            .then(data2 => {
                data2['bid'] = text2;
                setBlog(data2)
                console.log(blog);
                console.log(data2)
            })


    }, []);

    return (
        <>
            <head>
                <title>Blog</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
                <link rel="stylesheet" href="blog.css"></link>
            </head>
            <body>
                <Navbar />
                <div id="wrapper">
                    {/* sidebar component */}
                    <SideBar></SideBar>
                    {/* Actual blog component */}
                    <div id="page-content-wrapper">
                        <div class="container-fluid">

                            {/* blog body */}
                            <BlogContent blog={blog}></BlogContent>
                            {/* Comment Section */}
                            <Comments blog={blog}></Comments>
                        </div>
                    </div>
                </div>
            </body>
        </>



    )


}