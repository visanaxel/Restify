import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import axios from 'axios';
import Axios from 'axios';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg'

export const Create_Blog_Post = () => {
    var endpoint = "http://127.0.0.1:8000/blog/add/"

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [imageError, setImageError] = useState("");

    let navigate = useNavigate();

    const handle = () => {
        console.log("MADE IT TO HANDLE!")
        console.log(title)
        console.log(content)
        console.log(image)
        const formData = new FormData()
        var flag = false

        if (title == "") {
            setTitleError("Please enter a blog title")
            flag = true
        } else {
            setTitleError("")

        }
        if (content == "") {
            setContentError("Please include content")
            flag = true
        } else {
            setContentError("")

        }
        if (image == null) {
            setImageError("Please include an image")
            flag = true
        } else {
            setImageError("")

        }

        if (flag) {
            return
        }

        formData.append("title", title)
        formData.append("content", content)
        formData.append("image", image)


        Axios.post(endpoint, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                var navi = "/blog/"
                navi.concat()

                var url = "/blog/" + data2['id'] + "/" + data2['rid']
                navigate(url);
            }).catch((error) => {

            });

    }

    return (<>
        <head>
            <title>Blog</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"></script>
            <link rel="stylesheet" href="blog.css" />
        </head>
        <Navbar />
        {/* <ParticlesBg num={5} type="circle" id="particles-js" bg={{
            position: "fixed",
            zIndex: "-1",
            width: "100%"
        }} /> */}
        <br></br>
        <div class="container-fluid ">

            <div class="row title">
                <div class="col-8">

                </div>
                <form id="dannyform">
                    <div class="form-group">
                        <h1>Create Blog Post</h1>
                        <hr></hr>
                        <label class="mb-0" for="exampleInputPassword1"><h4>Post Banner</h4></label>

                        <input type="file" accept="image/png, image/gif, image/jpeg" class="form-control-file mt-0" id="exampleFormControlFile1" onChange={e => setImage(e.target.files[0])} />
                        <p class="mt-0 mb-0" style={{ color: 'red' }}>{imageError}</p>
                        <label class="mb-0 mt-3" for="exampleInputPassword1"><h4>Title</h4></label>
                        <div class="row mb-3">
                            <div class="col-12 mr-0">
                                <input class="form-control" id="exampleInputPassword1" placeholder="Type Name" onChange={(e) => {
                                    setTitle(e.target.value);
                                }} />
                                <p style={{ color: 'red' }}>{titleError}</p>
                                <label class="mb-0" for="exampleInputPassword1"><h4>Content</h4></label>

                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" cols="140" onChange={(e) => {
                                    setContent(e.target.value);
                                }}></textarea>
                                                                <p style={{ color: 'red' }}>{contentError}</p>

                                <button type="button" class="btn btn-primary mt-1" onClick={handle}>Submit</button>

                                <br></br>
                            </div>
                            <div class="col-5">
                            </div>
                        </div>
                    </div>

                </form>
            </div>




        </div>


        <Footer />

    </>

    )

}
