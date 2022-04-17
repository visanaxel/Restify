import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../pages/Home/Home.css';

function MapCard(props) {

    if (props['data']['results'] !== undefined) {

        var result = props['data']['results'].reduce((resultArray, item, index) => { 
            const chunkIndex = Math.floor(index/3)
          
            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
        }, [])

        return (
            <>
            <div id="top_res_cards">

                { result.map( (sublist, i) => { 
                    console.log(sublist);
                    return (
                        <> 
                            <div className="card-deck card_row"> { sublist.map( (element, j) => {
                                return (<>
                                    <div className="card">
                                        <a href={"http://localhost:3000/restaurant/" + element['id']}>
                                            <img className="card-img-top" src={element['logo']} alt="Card image cap"/>
                                            <div className="card-body">
                                                <h5 className="card-title">{element['name']}</h5>
                                            </div>
                                        </a>
                                    </div>
                                </>)

                            })  }</div> 
                        </>
                    )
                })}
            </div>
            </>
        )

    }

}

export default MapCard;

{/* <div id="top_res_cards">
    <div className="card-deck card_row">
        <div className="card">
            <a href="../restaurant_page/restaurant.html">
                <img className="card-img-top" src={props['data']['results'][0]['logo']} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{props['data']['results'][0]['name']}</h5>
                </div>
            </a>
        </div>
    </div>
</div> */}