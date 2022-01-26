import axios from "axios";
import { Component } from "react";
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
        console.log("err=", err);
        let message = "";
        if (err.response && err.response.data) {
          console.log("err.response.data=", err.response.data);
          message = err.response.data.error;
        } else {
          console.log("err.message=", err.message);
          message = err.message;
        }
        this.setState({
          isLoginError: true,
          errorMessage: message
        });
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
            {isLoginError && <p className="login__error">{errorMessage}</p>}
            <form onSubmit={this.login}>
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
              <div className="login-form__action">
                <Button value="Login" type="primary" />
              </div>
            </form>
          </div>
        </Card>
        <Footer />
      </>
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
