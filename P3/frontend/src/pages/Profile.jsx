import React from "react";
import "../components/Profile/profile.css"
import Button from '../components/Button'
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Card from "../components/Card/card"
import axios from 'axios';
import Axios from 'axios';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'profile_pic': '',
            'phone_number': '',
            'first_name': '',
            'last_name': '',
            'email': '',
        }
    };

    render() {
        return (<p>test</p>);
    }
}

export const ProfileView = () => {
    return new ProfileView2();
}
// const makePost = () => {
//     console.log("here")
//     let response

//     response = axios.get(`http://127.0.0.1:8000/users/profile`) {
//         headers: {
//             "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMTQyNzkyLCJpYXQiOjE2NTAwNTYzOTIsImp0aSI6IjE5ZDY1MDU0MDg1MzRhYTRhYTk5MjhjOTFjNDgyOGVkIiwidXNlcl9pZCI6MX0.gC93XS-4HbZeaRgszLc8x4lJyc27S4RzxgOFuyB7AtM`
//         }
//     }

//     let data = response.data
//     console.log("data" + data)
// }
const getUser = () => {

    console.log("CALLED")

    const x = []
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMTQ0NTgxLCJpYXQiOjE2NTAwNTgxODEsImp0aSI6ImNmMzVhOTZlN2IxODQ2YzFiOWI2N2IzMWM2ZjJhYjljIiwidXNlcl9pZCI6MX0.7z2TatDXOjZSEOL3BYADnq5e9wLUB-4OqWqXHuUcjD8"
    const config = {
        headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMTQ0NTgxLCJpYXQiOjE2NTAwNTgxODEsImp0aSI6ImNmMzVhOTZlN2IxODQ2YzFiOWI2N2IzMWM2ZjJhYjljIiwidXNlcl9pZCI6MX0.7z2TatDXOjZSEOL3BYADnq5e9wLUB-4OqWqXHuUcjD8"}    
    };
    const data = {};

    Axios.get('http://127.0.0.1:8000/users/profile/', data, config)
        .then(result => result.data)
        .then(data2 => {
            console.log(data2)
        })
}

export default class ProfileView2 extends React.Component {

    render() {
        return (
            <div>
                <link rel="stylesheet" href="profile.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                <Navbar />
                {getUser()}
                <p className="blog">Profile</p>
                <Card />
                <Footer />
            </div>
        )
    }
}