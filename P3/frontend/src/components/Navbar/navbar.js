import React, { useState } from 'react';

function Navbar() {
  return ( <>
<header id="nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="http://localhost:3000/home">🆁🅴🆂🆃🅸🅵🆈</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="http://localhost:3000/home">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="../restaurant_page/restaurant.html">My Restaurant</a>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                      <a className="btn btn-secondary dropdown-toggle" href="#" style={{color: 'grey', backgroundColor: 'white', border: '#f8f9fa!', paddingTop: '8px'}} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" href="../profile_page/profile.html">Profile</a></li>
                        <li><a className="dropdown-item" href="../profile_page/edit_profile.html">Edit Profile</a></li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="dropdown">
                      <a className="btn btn-secondary dropdown-toggle" href="#" style={{color: 'grey', backgroundColor: 'white', border: '#f8f9fa!', paddingTop: '8px'}} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Notifications
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" href="../notifcations/notification.html">User Notifications</a></li>
                        <li><a className="dropdown-item" href="../notifcations/restaurant_notifs.html">Restaurant Notifications</a></li>
                      </ul>
                    </div>
                  </li>
                  <li id="logout" className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                  </li>
                  {/* <li class="nav-item">
                          <a class="nav-link disabled" href="#">Disabled</a>
                      </li> */}
                </ul>
              </div>
            </nav>
          </header>

</>
  );
}

export default Navbar;