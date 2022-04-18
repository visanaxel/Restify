import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../pages/Notification/notification.css';
import { useNavigate } from 'react-router-dom';

function FeedCard(props) {

     let nav = useNavigate()

    function go(bid, rid) {
        nav('../blog/' + bid + '/' + rid);
    }

    if (props['data']['results'] !== undefined) {

        var result = props['data']['results'];

        //console.log(result);

        return (
            <>
            {result.map((item, i) => {

                return (
                    <>
                    <div className="row mt-0" >
                        <div className="col-2 picture_column d-flex justify-content-end">
                            <img className="profile_pic" src={item['image']}/>
                        </div>
                        <div className="col-8" onClick={() => go(item['id'], item['rid'])}>
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">

                                <h4 className="alert-heading">{item['title']}</h4>
                                <p>{item['content'].substring(0, 200) + '...'}</p>

                            </div>
                        </div>
                    </div>
                    </>
                )
            })}
            </>
        );
    }
}

export default FeedCard;