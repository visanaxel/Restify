import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../pages/Notification/notification.css';

function NotifCard(props) {

    if (props['data']['results'] !== undefined) {

        var result = props['data']['results'];

        console.log(result);

        return (
            <>
            {result.map((item, i) => {

                return (
                    <>
                    <div class="row mt-0">
                        <div class="col-2 picture_column d-flex justify-content-end">
                            <img class="profile_pic" src="https://cdn.mos.cms.futurecdn.net/xDGQ9dbLmMpeEqhiWayMRB.jpg"/>
                        </div>
                        <div class="col-8">
                            <div class="alert alert-primary alert-dismissible fade show" role="alert">

                                <h4 class="alert-heading">{item['notif_type']}</h4>
                                <p>{item['description']}</p>

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

export default NotifCard;

{/* <div class="row mt-0">
    <div class="col-2 picture_column d-flex justify-content-end">
        <img class="profile_pic" src="https://cdn.mos.cms.futurecdn.net/xDGQ9dbLmMpeEqhiWayMRB.jpg">
    </div>
    <div class="col-8">
        <div class="alert alert-primary alert-dismissible fade show" role="alert">

            <h4 class="alert-heading">New blog post from Mcdonalds: Why we are actually healthy!</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus purus ac leo pellentesque, non
                frin, consectetur adipiscing elit. Duis finibus purus ac leo pellentesque, non frin</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <hr>
            <p class="mb-0">Posted 3 days ago</p>

        </div>
    </div>
</div> */}