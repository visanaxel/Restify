import React from "react";
import "../components/Profile/profile.css"
import Button from '../components/Button'
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import Card from "../components/Card/card"


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

export default class ProfileView2 extends React.Component {
    async retrieveInfo () {
        let response
        if(this.props.private !== true){
            const username = this.props.kwargs.username
            response = await axios.get(`http://localhost:5000/api/Profiles/${username}`,{ 
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        }
        else{
            response = await axios.get(`http://localhost:5000/api/Profiles/`,{ 
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        }
        let data = response.data
        
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="profile.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                <Navbar />
                <p className="blog">Profile</p>
                <Card/>
                <Footer />
            </div>
        )
    }
}