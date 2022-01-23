import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./LoginPage.scss";

const loginUrl = `${process.env.REACT_APP_API_URL}/login`;

class LoginPage extends Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    errorMessage: null,
    isLoginError: false,

    userInfo: {}
  };

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

  handleClickSignup = (e) => {
    e.preventDefault();
    this.props.history.push("/signup");
  };

  renderLogin = () => {
    const { isLoginError, errorMessage } = this.state;
    return (
      <>
        <CustomHeader />
        <Card>
          <div>
            <h1 className="login__heading">Login</h1>
            {isLoginError && (
              <label style={{ color: "red" }}>{errorMessage}</label>
            )}
            <form
              // ref={(form) => (this.loginForm = form)}
              onSubmit={this.login}
            >
              <label htmlFor="username" className="login-form__label">
                Username:
              </label>
              <input
                type="text"
                className="login-form__input"
                name="username"
                required
              />
              <label htmlFor="password" className="login-form__label">
                Password:
              </label>
              <input
                type="password"
                className="login-form__input"
                name="password"
                required
              />
              <div className="medication-form__action">
                <Button value="Login" type="primary" />

                <Button
                  value="Sign Up"
                  type="secondary"
                  onClick={this.handleClickSignup}
                />
              </div>
            </form>
            {/* <Link to="/signup">Sign Up</Link> */}
          </div>
        </Card>
        <Footer />
      </>
      // <div>
      //   <h1>Login</h1>
      //   {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
      //   <form ref={(form) => (this.loginForm = form)} onSubmit={this.login}>
      //     <div className="form-group">
      //       Username: <input type="text" name="username" />
      //     </div>
      //     <div className="form-group">
      //       Password: <input type="password" name="password" />
      //     </div>
      //     <button className="btn btn-primary" type="submit">
      //       Login
      //     </button>
      //   </form>
      //   <Link to="/signup">Sign Up</Link>
      // </div>
    );
  };

  render() {
    console.log("render login");
    if (this.state.isLoggedIn) {
      return <Redirect to="/profile" />;
    }
    return this.renderLogin();
  }
}

export default LoginPage;
