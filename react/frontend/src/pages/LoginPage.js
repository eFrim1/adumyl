import React, { Component } from 'react';
import '../App.css'; // Custom styles for the sign-up page
import { authenticateUser } from '../api/authApi';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {Navigate, useNavigate} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogin: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      success: false,
    };
  }

  toggleLogin = (status) => {
    if(status){
      return this.setState({viewLogin: true})
    }

    return  this.setState({viewLogin: false})
  }

  renderTab = () => {
    return (
        <div className="submit-container">
          <div role="button" className={this.state.viewLogin? "submit gray": "submit"} onClick = {() => this.toggleLogin(false)} > SIGN UP</div>
          <div role="button" className={this.state.viewLogin? "submit": "submit gray"} onClick = {() => this.toggleLogin(true)}> SIGN IN</div>
        </div>
    );
  };


  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  handleSubmit = async (e) => {
  e.preventDefault();

    const { viewLogin, firstName, lastName, email, password, confirmPassword } = this.state;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Password validation for sign-up
    if (!viewLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = viewLogin
      ? { email, password } // Login payload
      : { first_name: firstName, last_name: lastName, email, password, password_confirm: confirmPassword }; // Sign-up payload

    try {
      const data = await authenticateUser(payload, viewLogin); // API call
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        success: true,
      });
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
};
  debugLogin = async () => {
    const payload = {
      email: "test25@gmail.com",
      password: "test"
    };
    await authenticateUser(payload, true);
    this.setState({success: true})
  }



  render() {
    const {viewLogin, firstName, lastName, email, password, confirmPassword, success } = this.state;

    return (
        <Container fluid>
          {success && (<Navigate to="/home"  />)}
          <Row>
          <Col >
            <div className="rotated-square first position-absolute"></div>
            <div className="rotated-square second position-absolute"></div>
            <div className="rotated-square third  position-absolute">ENJOY<br/>Adumyl</div>
          </Col>
          <Container className="container secondary login">
            <h1>Adumyl</h1>
            {this.renderTab()}
            <Form onSubmit={this.handleSubmit} className="login-form">
              {!viewLogin &&
                  <FormGroup>
                    <Label for="first_name">
                      First Name
                    </Label>
                    <Input
                        id="first_name"
                        name="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={this.handleChange}
                        required={true}
                    />
                  </FormGroup>
              }
              {!viewLogin &&
                  <FormGroup>
                    <Label for="last_name">
                      Last Name
                    </Label>
                    <Input
                        id="last_name"
                        name="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={this.handleChange}
                        required={true}
                    />
                  </FormGroup>
              }

              <FormGroup>
                <Label for="email">
                  Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={this.handleChange}
                    required={true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">
                  Password
                </Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    required={true}
                />
              </FormGroup>
              {!viewLogin && (
                  <FormGroup>
                    <Label for="confirm_password">
                      Confirm Password
                    </Label>
                    <Input
                        id="confirm_password"
                        name="confirmPassword"
                        placeholder="Password"
                        type="password"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required={true}
                    />
                  </FormGroup>
              )}
              <Button type="submit" size="lg">
                {viewLogin ? 'Sign in' : "Let's start"}
              </Button>
              <Button type="button" size="lg" onClick={this.debugLogin}>Debug Login</Button>
            </Form>
          </Container>
          </Row>
        </Container>
    );
  }
}

export default Login;
