import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../pages/Home/Home.css';

function ResultCard(props) {

    console.log(props['data']['results']);

    if (props['data']['results'] !== undefined) {

        return (
            <>
            <div id="top_res_cards">
                <div className="card-deck card_row">
                    <div className="card">
                        <a href={"http://localhost:3000/restaurant/" + props['data']['results'][0]['id']}>
                            <img className="card-img-top" src={props['data']['results'][0]['logo']} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{props['data']['results'][0]['name']}</h5>
                            </div>
                        </a>
                    </div>
                    <div className="card">
                        <a href={"http://localhost:3000/restaurant/" + props['data']['results'][1]['id']}>
                            <img className="card-img-top" src={props['data']['results'][1]['logo']} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{props['data']['results'][1]['name']}</h5>
                            </div>
                        </a>
                    </div>
                    <div className="card">
                        <a href={"http://localhost:3000/restaurant/" + props['data']['results'][2]['id']}>
                            <img className="card-img-top" src={props['data']['results'][2]['logo']} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{props['data']['results'][2]['name']}</h5>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            </>
        )

    }

}

export default ResultCard;