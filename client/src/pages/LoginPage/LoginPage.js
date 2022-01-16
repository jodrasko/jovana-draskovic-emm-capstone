import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./LoginPage.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;

class LoginPage extends Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    errorMessage: null,
    isLoginError: false,

    userInfo: {}
  };
  //   componentDidMount() {
  //     // here grab token from sessionStorage
  //     const token = sessionStorage.getItem("token");

  //     axios
  //       .get(profileUrl, {
  //         headers: { authorization: `Bearer ${token}` }
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         this.setState({
  //           isLoading: false,
  //           userInfo: response.data
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }

  login = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value
      })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          this.setState({
            isLoginError: true,
            errorMessage: response.data.error.message
          });
        } else {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("profileId", response.data.profileId);
          this.setState({
            isLoggedIn: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/profile" />;
    }
    return this.renderLogin();
  }

  // const { isLoading, userInfo } = this.state;
  // return isLoading ? (
  //   <h1>Loading Login Page...</h1>
  // ) : (
  //   <h1>Welcome {userInfo.preferredName}!</h1>

  // );
}

export default LoginPage;

// const { isLoggedIn, isSignedUp } = this.state;

//     // Handle the Signup/Login
//     if (!isSignedUp) return this.renderSignUp();
//     if (!isLoggedIn) return this.renderLogin();

//     return (
//       <div className="App">
//         <Profile />
//       </div>
//     );
