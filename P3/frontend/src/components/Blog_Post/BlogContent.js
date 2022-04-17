import axios from 'axios';

const BlogContent = (props) => {
    console.log(props.blog['title'])

    function handle2() {
        console.log("HEYO")
        var temp1 = "http://127.0.0.1:8000/social/unlike/blog/"
        var temp2 = props.blog['bid']
        var temp3 = temp1.concat(temp2)
        var final = temp3.concat( "/")
        axios.delete(final, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}).then(result => result.data)
        .then(data2 => {
            console.log(data2)
        })
    }

    function handle() {
        // Check if user is logged in, by looking at local storage, use token to try and like, 
        var data = {}
        console.log(parseInt(props.blog['bid']))
        data['bid'] = parseInt(props.blog['bid'])
        console.log(data)
        const formData = new FormData()
        formData.append("bid", parseInt(props.blog['bid']))

        axios.post("http://127.0.0.1:8000/social/like/blog/", formData,{headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).catch(function (error) {
            if (error.response) {
                if (error.response.status == 400) {
                    console.log("HEY")
                    handle2()
                    return
                } else {
                    alert("you must login to like")
                    return
                }

            }
        })
        
    }   

    return (
        <>
             <div class="row photo_row mt-0">
                    <img src={props.blog['image']}/>
            </div>

            <div class="row title">
                <h1 class="mt-0 mb-0">{props.blog['title']}</h1>

            </div>
            <div class="row title">
                <p class="mt-0 mb-0">{props.blog['date']}</p>
            </div>

            <div class="row title">
                <input onClick={handle} width="30px" type="image" src="https://raw.githubusercontent.com/ChunKaiC/chunkaic.github.io/main/like.png" class="like"></input> <p class="ml-5">Likes: {props.blog['likes']}</p>
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