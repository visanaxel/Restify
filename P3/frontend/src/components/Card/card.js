import React, { useState } from 'react';

function Card() {
    return (<>
        <div className="cus_card">
            <div className="cus_container">
                <img src="kai.jpeg" className="img-author" alt="Avatar" />
                <p className="title_post2">Chun-Kai Chen</p>
                <p className="role">Ownder of Florida Beach Filet</p>
                <div className="profile_box">
                    Chun-Kai Chen is a Canadian student at the University of Toronto. He owns several restaurants in Florida,
                    including Danyalians Tacos, Filet Beach House and A&amp;W. Chun-Kai is hiring waiters, chefs and dishwashing workers
                    for the summer of 2022. Please send your updated resume to <a href="mailto: chunkaichenda3rd@gmail.com">chunkaichenda3rd@gmail.com</a>.
                </div>
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h2>Contact</h2>
                    </div>
                    <div className="row">
                        <div className="column">
                            <form action="/action_page.php">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" />
                                <label htmlFor="subject">Message</label>
                                <textarea id="subject" name="subject" placeholder="Enter a message" style={{ height: '170px' }} defaultValue={""} />
                                <input type="submit" defaultValue="Submit" className="center_submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></>

    );
}

export default Card;