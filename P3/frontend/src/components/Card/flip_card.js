import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";

function FlipCard(props) {
    console.log("here")
    console.log(props.data)

    const makePost = () => {

        Axios.patch("http://127.0.0.1:8000/restaurant/menu/:restaurant_id/edit/", formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => result.data)
            .then(data2 => {
                console.log(data2)


            }).catch((error) => {
                console.log(error.response)

            });
    }
    return (<>
        <div class="flip-card">
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
                                <button type="submit" class="btn btn-secondary"
                                    onclick="location.href='../add_edit_menu/edit_menu_item.html'">Edit Item</button>
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