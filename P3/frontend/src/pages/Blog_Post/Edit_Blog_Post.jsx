
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import axios from 'axios';
import Axios from 'axios';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Edit_Blog_Post = () => {
    console.log("Made it!")

    var text1 = "http://127.0.0.1:8000/blog/"
    var text2 = useParams()['blogId'];
    let text3 = text1.concat(text2);
    let result = text3.concat("/edit/")
    console.log(result)

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

        if (title !== "") {
            formData.append("title", title)
        }
        if (content !== "") {
            formData.append("content", content)
        }
        if (image !== null) {
            formData.append("image", image)
        }

        Axios.patch(result, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                var navi = "/blog/"
                navi.concat()
                navigate( navi.concat(text2));
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
                <link rel="stylesheet" href="blog.css" />
            </head>
            {/* <Navbar /> */}
            <div id="wrapper">

                <div id="page-content-wrapper">
                    <div class="container-fluid">
                        
                        <div class="row title">
                            <form>
                                <div class="form-group">
                                <label class = "mb-0" for="exampleInputPassword1"><h1>Blog Banner</h1></label>

                                    <input  type="file" class="form-control-file mt-0" id="exampleFormControlFile1" onChange=
                            {e => setImage(e.target.files[0])} />
                                    <label class = "mb-0" for="exampleInputPassword1"><h1>Title</h1></label>
                                    <div class="row">
                                        <div class="col-10 mr-0">
                                            <input class="form-control" id="exampleInputPassword1" placeholder="Type Title" onChange={(e) => {
                            setTitle(e.target.value);
                        }} />
                                        </div>
                                        <div class="col-5">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr />

                        <div class="row text_body">
                            
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Example text area</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="15" cols="140" onChange={(e) => {
                            setContent(e.target.value);
                        }}></textarea>
                                    <button type="submit" class="btn btn-primary" onClick={handle}>Submit</button>
                                </div>
                            

                        </div>

                        <hr />

                    </div>
                </div>

            </div>

            <Footer />


        </>

    )

}