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
import ParticlesBg from 'particles-bg'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


import { useNavigate } from 'react-router-dom';




export const Restaurant_View = () => {

    let navigate = useNavigate();

    console.log("Made it!")
    const [page2, setPage2] = useState(1);
    const [prev2, setPrev2] = useState(null);
    const [next2, setNext2] = useState("http://127.0.0.1:8000/restaurant/"+useParams()['restId']+"/view/comments")
    const [check2, setCheck2] = useState(false)

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

    const [owner, setOwner] = useState(false);

    const [follower, setFollower] = useState(false);
    const [liker, setLiker] = useState(false);

    const [follows, setFollows] = useState(0);
    const [likes, setLikes] = useState(0);

    // Check if liker
    useEffect(() => {
        data['rid'] = parseInt(text2)
        const formData = new FormData()
        formData.append("rid", parseInt(text2))

        axios.post("http://127.0.0.1:8000/social/like/restaurant/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).then(result => result.data)
        .then(data2 => {
            console.log("uhoh!")
            unlike()
        }).catch(function (error) {
            if (error.response.status == 400) {
                
                // unlike()
                setLiker(true)
                return
            } else {
                console.log(error.response.status)
                return
            }
        })

    }, []);

    // Check if follower
    useEffect(() => {
        data['rid'] = parseInt(text2)
        const formData = new FormData()
        formData.append("rid", parseInt(text2))

        axios.post("http://127.0.0.1:8000/social/follow/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).catch(function (error) {
            if (error.response.status == 400) {
                
                // unlike()
                setFollower(true)
                return
            } else {
                console.log(error.response.status)
                return
                
            }
        }).then(result => result.data)
        .then(data2 => {
            unfollow()
        })

    }, []);

    // Check if user owns this restaurant
    useEffect(() => {
        var check = "http://127.0.0.1:8000/restaurant/edit/"
        var check2 = check.concat(temp2)
        var final_check = check2.concat("/")
        Axios.patch(final_check, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                setOwner(true)
            }).catch((error) => {
                console.log(error.response)
               
            });
    }, []);

    // for images only hook
    const [check, setCheck] = useState(false);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState('http://127.0.0.1:8000/restaurant/'+useParams()['restId']+'/view/images/');

    useEffect(() => {
        Axios.get(next)
        .then(result => result.data)
        .then(json => {
           
            setData(json);
            setNext(json['next']);
            setPrev(json['previous']);
            setCheck(true)
        })
        .catch((error) => {
            setData(['false']);
            //console.log(error);
        });
        console.log('i fire once');

    }, [page]);

    function blog() {
            var temp1 = "http://127.0.0.1:8000/restaurant/"
            var temp3 = temp1.concat(text2)
            var result = temp3.concat("/blogs/")
            axios.get(result).then(result => result.data)
                .then(data2 => {
                    console.log("AHHHH")
                    console.log(data2)
                    if (data2['results'].length == 0 && owner==false) {
                        alert("Restaurant has no blogs")
                    } else if (data2['results'].length == 0 && owner==true) {
                        // take to create blog
                        navigate('/blog/add')
                    }
                    var bid = data2['results'][0]['id']
                    var final_url = "/blog/" + bid + "/"+ text2
                    navigate(final_url)
                })
        }

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
                    // handle2()
                    setPage2(page2+1)
                    setNext2("http://127.0.0.1:8000/restaurant/"+text2+"/view/comments")
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

    // function handle2() {
    //     // GETTING COMMENTS
    //         axios.get(comment_result).catch(function (error) {
    //             if (error.response) {
    //                 if (error.response.status == 404) {
    //                     console.log("404!")
    //                     console.log(comment_result)
    //                 } else {
    //                     console.log("cry!")
    //                 }

    //             }

    //         }).then(result => result.data)
    //             .then(data2 => {
    //                 setItems(data2['results'])
    //                 console.log(data2)
    //                 setComment("")
    //                 setCommentError("")
    //             })

    //     }

    function UpdateLikesFollows () {
        axios.get(rest_result)
        .then(result => result.data)
        .then(data2 => {
            setLikes(data2['likes'])
            setFollows(data2['followers'])
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
                    setLikes(data2['likes'])
                    setFollows(data2['followers'])
                    console.log(data2)

                })

                // GETTING COMMENTS
          

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

        useEffect(() => {
            Axios.get(next2)
            .then(result => result.data)
            .then(json => {
                setItems(json);
                setNext2(json['next']);
                setPrev2(json['previous']);
                setCheck2(true)
            })
            .catch((error) => {
                setItems(['false']);
            });
            console.log('i fire once');
    
        }, [page2]);

    function unlike() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unlike/restaurant/"
        var temp2 = text2
        var temp3 = temp1.concat(temp2)
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

        data['rid'] = parseInt(text2)
        const formData = new FormData()
        formData.append("rid", parseInt(text2))

        axios.post("http://127.0.0.1:8000/social/like/restaurant/", formData, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
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

    function unfollow() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unfollow/"
        var temp2 = text2
        var temp3 = temp1.concat(temp2)
        var final = temp3.concat("/")
        axios.delete(final, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }).then(result => result.data)
            .then(data2 => {
                console.log(data2)
                setFollower(false)
                UpdateLikesFollows()
            });
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
                    //UpdateLikesFollows()
                    setFollower(true)
                    UpdateLikesFollows()

                    return
                } else {
                    console.log(error.response.status)
                    alert("you must login to follow")
                    return
                }

            }
        })
        //window.location.reload();
    }

    function edit() {
        var tempEdit = "/restaurant/edit/"
        navigate(tempEdit.concat(temp2));
    }

    function menu() {
        var tempMenu = "/restaurant/"
        var tempMenu2 = tempMenu.concat(temp2)
        var finalMenu = tempMenu2.concat(/menu/)
        navigate(finalMenu);
    }

    if (check && check2){


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
            <ParticlesBg num={5} type="circle" id="particles-js" bg={{
                    position: "fixed",
                    zIndex: "-1",
                    width: "100%"
                    }} />
           
            <body style={{margin: '200 px'}}>

            <div class="card">
                <div class="card-body">
                <h1 class="card-title">{restaurant['name']}</h1>

                    <div id="store_logo" class="mb-4">
                        <img id="restlogo" src={restaurant['logo']} alt="restaurant logo" />
                    </div>
                    {(follower) ? <button type="button" class="follow btn btn-primary" onClick={unfollow}>Following!</button> : <button type="button" class="follow btn btn-primary" onClick={follow}>Follow</button>}     
                     {(liker) ?  <button type="button" class="like btn btn-primary ml-4" onClick={unlike}>Liked!</button> : <button type="button" class="like btn btn-primary ml-4" onClick={like}>Like</button>}
                    
                    <h5 class="card-text mt-1">Likes: {likes}</h5>
                    <h5 class="card-text">Followers: {follows}</h5>
                    <h5 class="card-text">Address: {restaurant['address']}</h5>
                    <h5 class="card-text">Postal Code: {restaurant['postal_code']}</h5>
                    <h5 class="card-text">Phone number: {restaurant['phone_number']}</h5>


                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title" onClick={menu}>Menu</h5>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title" onClick={blog} >Blogs</h5>
                </div>
            </div>
            {(owner) ? 
            <div class="card">
                <div class="card-body" onClick={edit}>
                    <h5 class="card-title">Edit Restaurant</h5>
                </div>
            </div> : <p></p>}

            <div class="row ml-4">
                <h1 class="mt-0 mb-0">Comments</h1>
            </div>

            <div class="row mb-3 ml-3">
                <form class="col-8">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Add comment</label>
                        <p>{commentError}</p>
                        <textarea value={comment} class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setComment(e.target.value) }}></textarea>
                    </div>

                    <button type="button" class="btn btn-primary" onClick={handle}>Submit</button>
                </form>
            </div>

                
            {items['results'].map((item, i) => {
                return (
                    <div class="row ml-4">
                        <div class="col-8">
                            <div class="row">

                                <div class="col-10 pl-1">
                                    <h5>{item['username']}</h5>
                                    <p>{item['comment']}</p>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            })}
             <Typography align='center'>
                {((prev2 !== null) ? <Button marginRight='50' value="prev" variant="contained" onClick={() => {setPage2(page2 - 1); setNext2(prev2)}}>Previous</Button> : <div></div>)}
                {(((prev2 !== null) && (next2 !== null)) ? <div style={{display: 'inline-block'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> : <p></p>)}
                {((next2 !== null && (items['results'].toString() !== 'false')) ? <Button value="next" variant="contained" onClick={() => setPage2(page2 + 1)}>Next</Button> : <div></div>)}
                </Typography>
            <br></br>
            <br></br>
            <Footer></Footer>
</body>
        </>
    )
            }
}