
import './register.css';
import React from "react";
import RegisterForm from '../../components/Register/RegisterForm';
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";


export default class Register2 extends React.Component {


    
    render(){
        return(
            <><head>
                <title>Index</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
                <link rel="stylesheet" href="register.css" />
            </head><body>
                <Navbar></Navbar>
                    <div class="container-fluid bg">
                        <div class="row">
                            <div class="col-md-4 col-sm-4 col-xs-12"></div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <RegisterForm></RegisterForm>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12"></div>

                        </div>


                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>

                    <Footer></Footer>


                </body></>
        )
    }
}

// export const Register = () => {
//     return <>
        

//     </>
// }

export const Register = () => {
    return new Register2();
}