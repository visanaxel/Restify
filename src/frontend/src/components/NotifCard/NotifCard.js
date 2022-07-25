import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../pages/Notification/notification.css';

function NotifCard(props) {

    function typeHeading(type) {
        if (type === 'm') {
            return "Menu change!";
        }
        if (type === 'n') {
            return "New item!";
        }
        if (type == 'b'){
            return 'New blog!';
        }
        if (type == 'l') {
            return 'Restaurant liked!';
        }
        if (type == "c") {
            return 'New comment on restaurant!'
        }
        return 'Restaurant followed!';
    }

    //console.log(pic);
    
    if (props['data']['results'] !== undefined) {

        var result = props['data']['results'];

        //console.log(result);

        return (
            <>
            {result.map((item, i) => {

                return (
                    <>
                    <div className="row mt-0">
                        <div className="col-2 picture_column d-flex justify-content-end">
                            <img className="profile_pic" src={item['logo']}/>
                        </div>
                        <div className="col-8">
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">

                                <h4 className="alert-heading">{typeHeading(item['notif_type'])}</h4>
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

{/* <div className="row mt-0">
    <div className="col-2 picture_column d-flex justify-content-end">
        <img className="profile_pic" src="https://cdn.mos.cms.futurecdn.net/xDGQ9dbLmMpeEqhiWayMRB.jpg">
    </div>
    <div className="col-8">
        <div className="alert alert-primary alert-dismissible fade show" role="alert">

            <h4 className="alert-heading">New blog post from Mcdonalds: Why we are actually healthy!</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus purus ac leo pellentesque, non
                frin, consectetur adipiscing elit. Duis finibus purus ac leo pellentesque, non frin</p>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <hr>
            <p className="mb-0">Posted 3 days ago</p>

        </div>
    </div>
</div> */}