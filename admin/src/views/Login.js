import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn, MDBModalFooter } from 'mdbreact';
import '../assets/css/login.css'
import API from "../api";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }
    Login = () => {
        const data = {
            username: this.state.userName,
            password: this.state.password
        }
        console.log('data', data)
        API.post(`user/loginAdmin`, data, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res) => {
            if (res && res.status === 200) {
                setTimeout(() => {
                    window.location = "/admin/dashboard";
                }, 1000)
            }
            else {
                alert("Username or password incorrect");
            }
        });
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>Sign in</strong>
                                    </h3>
                                </div>
                                <MDBInput
                                    name="userName"
                                    label="Your username"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e)=> this.handleInput(e)}
                                />
                                <MDBInput
                                    label="Your password"
                                    name="password"
                                    group
                                    type="password"
                                    validate
                                    containerClass="mb-0"
                                    onChange={(e)=> this.handleInput(e)}
                                />
                                {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                                    Forgot
                <a href="#!" className="blue-text ml-1">

                                        Password?
                </a>
                                </p> */}
                                <div className="text-center mb-3">
                                    <MDBBtn
                                        type="button"
                                        gradient="blue"
                                        rounded
                                        className="btn-block z-depth-1a"
                                        onClick={this.Login}
                                    >
                                        Sign in
                </MDBBtn>
                                </div>
                                {/* <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                                    or Sign in with:
              </p>
                                <div className="row my-3 d-flex justify-content-center">
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="mr-md-3 z-depth-1a"
                                    >
                                        <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                                    </MDBBtn>
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="mr-md-3 z-depth-1a"
                                    >
                                        <MDBIcon fab icon="twitter" className="blue-text" />
                                    </MDBBtn>
                                    <MDBBtn
                                        type="button"
                                        color="white"
                                        rounded
                                        className="z-depth-1a"
                                    >
                                        <MDBIcon fab icon="google-plus-g" className="blue-text" />
                                    </MDBBtn>
                                </div> */}
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                {/* <p className="font-small grey-text d-flex justify-content-end">
                                    Not a member?
                <a href="#!" className="blue-text ml-1">

                                        Sign Up
                </a>
                                </p> */}
                            </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        )
    }
}
export default Login;