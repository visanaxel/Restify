import './notification.css';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import Search from "../../components/Search/Search";
import ResultCard from '../../components/ResultCard/ResultCard';

export const UserNotif = () => {

    return (
        <>
            <Navbar></Navbar>

            <Footer></Footer>
        </>
    );
}