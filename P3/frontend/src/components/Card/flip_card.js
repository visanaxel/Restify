import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Typography from "@material-ui/core/Typography";
import { useNavigate } from 'react-router-dom';

function FlipCard(props) {
    console.log("here")
    console.log(props.data)
    const [owner, setOwner] = useState(false);
    let navigate = useNavigate();


    const checkItem = () => {

        Axios.patch("http://127.0.0.1:8000/restaurant/menu/" + window.location.pathname.split("/")[2] + "/edit/", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                setOwner(true)
            }).catch((error) => {
                console.log(error.response)
               

            });
        return owner;   
    }
    const editItem = (menu_id) => {

        Axios.patch("http://127.0.0.1:8000/restaurant/menu/" + window.location.pathname.split("/")[2] + "/edit/", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                navigate("/menu/" + menu_id + "/edit/")
            }).catch((error) => {
                console.log(error.response)
               

            });
        return owner;   
    }
    return (<>
        <div class="flip-card" id={props.data['rid']}>
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div class="card">
                        <img class="card-img-top" src={props.data['image']} alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">{props.data['name']}</h5>

                        </div>
                        <div class="card-footer">
                            <medium class="text-muted" id="price">
                                <div>${props.data['price']}</div>
                            </medium>
                        </div>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="card">
                        <div class="card-body-back"><br />
                            <div class="button-holder">
                            <Typography align='center'>
                            {(checkItem()) ? <Button type="submit"
                                    
                                    id={props.data['rid']}
                                    onClick={() => { editItem(props.data['rid']);}}
                                    variant="contained" name="foo" value="upvote">Edit Item</Button> : <div>[Please login as the owner to edit this item]</div>}
                            </Typography>
                                
                            </div>
                            <h5 class="card-title">{props.data['name']}</h5>

                            <p class="card-text">{props.data['description']}</p>
                        </div>

                        <div class="card-footer">
                            <medium class="text-muted" id="price">
                                <div>${props.data['price']}</div>
                            </medium>
                        </div>
                    </div>
                </div>
            </div>
        </div></>

    );
}

export default FlipCard;