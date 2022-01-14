import React, { Component } from "react";
import Profile from "./pages/Profile";
import "./App.css";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

class App extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  login = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
        this.setState({
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoginError: true, errorMessage: err });
      });
  };

  signup = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl, {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isSignedUp: true,
        });
      })
      .catch((err) => console.log(err));
  };

  renderSignUp() {
    return (
      <div>
        <h1>SignUp</h1>
        <form ref={(form) => (this.signUpForm = form)} onSubmit={this.signup}>
          <div className="form-group">
            Username: <input type="text" name="username" />
          </div>
          <div className="form-group">
            Name: <input type="text" name="name" />
          </div>
          <div className="form-group">
            Password:{" "}
            <input type="password" name="password" autoComplete="true" />
          </div>
          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </form>
      </div>
    );
  }

  renderLogin = () => {
    const { isLoginError, errorMessage } = this.state;
    return (
      <div>
        <h1>Login</h1>
        {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
        <form ref={(form) => (this.loginForm = form)} onSubmit={this.login}>
          <div className="form-group">
            Username: <input type="text" name="username" />
          </div>
          <div className="form-group">
            Password: <input type="password" name="password" />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  };

  render() {
    const { isLoggedIn, isSignedUp } = this.state;

    // Handle the Signup/Login
    if (!isSignedUp) return this.renderSignUp();
    if (!isLoggedIn) return this.renderLogin();

    return (
      <div className="App">
        <Profile />
      </div>
    );
  }
}

export default App;
