import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';

function AddItem(props) {
    console.log("here")
    console.log(props.data)
    const [owner, setOwner] = useState(false);
    let navigate = useNavigate();


    const checkItem = () => {
        console.log(window.location.pathname.split("/")[2])

        Axios.patch("http://127.0.0.1:8000/restaurant/edit/"+window.location.pathname.split("/")[2]+"/", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log("NICE")
                setOwner(true)
            }).catch((error) => {
                console.log(error.response)


            });
            console.log("owner")
            console.log(owner)
        return owner;
    }
    const addItem = () => {
        navigate('/restaurant/' + window.location.pathname.split("/")[2] + '/menu/add/')
    }
    return (<><div>
            {(checkItem()) ? <Button type="submit"

                onClick={() => { addItem(); }}
                variant="contained" name="foo" value="upvote">Add Item</Button> : <div>[Please login as the owner to add an item to the restaurant.]</div>}
            </div></>

    );
}

export default AddItem;