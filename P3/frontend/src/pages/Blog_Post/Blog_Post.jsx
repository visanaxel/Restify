import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";

import Footer from "../../components/Footer/footer";
import BlogContent from "../../components/Blog_Post/BlogContent";
import Comments from "../../components/Blog_Post/Comments";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import { useState } from 'react';
import './blog.css';
import ParticlesBg from 'particles-bg'
import { useNavigate } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";




export const Blog_Post = () => {
    console.log("Made it!")
    var rid = useParams()['restId'];

    var text1 = "http://127.0.0.1:8000/blog/"
    var text2 = useParams()['blogId'];
    let text3 = text1.concat(text2);
    let result = text3.concat("/view/")
    console.log(result)

    const [items, setItems] = useState([]);
    const [check, setCheck] = useState(false);

    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState("http://127.0.0.1:8000/restaurant/" + rid + "/blogs/")

    const [blog, setBlog] = useState({});
    console.log("MADE IT HERE!")
    let navigate = useNavigate();

    const [owner, setOwner] = useState(false);

    // Check if user owns this blog post
   

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
                setBlog(data2)
                var url = "http://127.0.0.1:8000/blog/"+data2['id']+"/edit/"
                Axios.patch(url, {}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(result => result.data)
                    .then(data2 => {
                        setOwner(true)
                    }).catch((error) => {
                        console.log(error.response)
                       
                    });
            })
    }, []);
    
    useEffect(() => {

        console.log("AHHHHH")
        Axios.get(next)
        .then(result => result.data)
        .then(json => {
            
            setItems(json);
            setNext(json['next']);
            setPrev(json['previous']);
            setCheck(true)
        })
        .catch((error) => {
            setItems(['false']);
            //console.log(error);
        });
        // console.log('i fire once');
        
    }, [page]);

    function create() {
        navigate('/blog/add')
    }

    function edit(){
        navigate('/blog/edit/'+blog['id'])
    }

    function del(){
        var url = "http://127.0.0.1:8000/blog/"+text2+"/remove/"
        Axios.delete(url, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(result => result.data)
        .then(data2 => {
            var url = "http://127.0.0.1:8000/restaurant/"+rid+"/blogs/"
            Axios.get(url).then(result => result.data)
            .then(data2 => {
                if (data2['count'] == 0) {
                    navigate("/restaurant/"+rid)
                } else {
                    console.log("aposidfhasiodfhp")
                    var blog = data2['results'][0]['id']
                    navigate("/blog/"+blog+"/"+rid)
                    
                }
            })
        })
    }
    // console.log(items)
    if (check) {
        console.log(items['results']);
        console.log(prev)
        console.log(next)

        // var result2 = items['results'].splice()
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

                    <div id="sidebar-wrapper">
                        <ul class="sidebar-nav">
                        {(owner) ? 
                        <>
                            <li className="mt-3">
                                <button type="button" onClick={create} class="btn btn-outline-primary">Create new Blog post</button>
                            </li>
                            <li className="mt-3">
                                <button type="button" onClick={edit} class="btn btn-outline-primary">Edit Blog post</button>
                            </li>
                            <li className="mt-3 mb-5">
                                <button type="button" onClick={del} class="btn btn-outline-primary">Delete Blog post</button>
                            </li>

                            </>:<p></p>}

                            {items['results'].map((item, i) => {
                                return (
                                    <><li>
                                        <p>{item['title']}</p>
                                    </li></>
                                )

                            })}
                            <Typography align='center'>
                            {((prev !== null) ? <Button marginRight='50' value="prev" variant="contained" onClick={() => {setPage(page - 1); setNext(prev)}}>Previous</Button> : <div></div>)}
                            {(((prev !== null) && (next !== null)) ? <div style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> : <p></p>)}
                            {((next !== null && (items.toString() !== 'false')) ? <Button value="next" variant="contained" style={{marginBottom: '100px'}} onClick={() => setPage(page + 1)}>Next</Button> : <div></div>)}
                                
                                </Typography>




                           

                        </ul>
                    </div>



                    {/* Actual blog component */}
                    <div id="page-content-wrapper">
                        <div class="container-fluid">

                            {/* blog body */}
                            <BlogContent blog={blog}></BlogContent>
                            {/* Comment Section */}
                            {/* <Comments blog={blog}></Comments> */}
                        </div>
                    </div>
                </div>
            </body>
        </>



    )


}}