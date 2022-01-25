import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./SignupPage.scss";

const signupUrl = `${process.env.REACT_APP_API_URL}/signup`;

class SignupPage extends Component {
  state = {
    isSignedUp: false,
    isSignupError: false,
    errorMessage: ""
  };

  signup = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl, {
        preferredName: e.target.preferredName.value,
        username: e.target.username.value,
        password: e.target.password.value
      })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          this.setState({
            isSignupError: true,
            errorMessage: response.data.error.message
          });
        } else {
          this.setState({
            isSignedUp: true
          });
        }
      })
      .catch((err) => {
        console.log("err=", err);
        this.setState({
          isSignupError: true,
          errorMessage: err.response.data.message
        });
      });
  };

  renderSignUp() {
    const { isSignupError, errorMessage } = this.state;
    return (
      <>
        <CustomHeader />
        <Card>
          <div>
            <h1 className="signup__heading">Sign Up</h1>
            {isSignupError && <p className="signup__error">{errorMessage}</p>}
            <form
              ref={(form) => (this.signUpForm = form)}
              onSubmit={this.signup}
            >
              <label htmlFor="username" className="signup-form__label">
                Username:
              </label>
              <input
                type="text"
                className="signup-form__input"
                name="username"
                required
              />
              <label htmlFor="preferredName" className="signup-form__label">
                Preferred Name:
              </label>
              <input
                type="text"
                className="signup-form__input"
                name="preferredName"
                required
              />
              <label htmlFor="password" className="signup-form__label">
                Password:
              </label>
              <input
                type="password"
                className="signup-form__input"
                name="password"
                required
              />
              <div className="signup-form__action">
                <Button value="Sign Up" type="primary" />
              </div>
            </form>
          </div>
        </Card>
        <Footer />
      </>
    );
  }

  render() {
    if (this.state.isSignedUp) {
      return <Redirect to="/login" />;
    }
    return this.renderSignUp();
  }
}

export default SignupPage;
