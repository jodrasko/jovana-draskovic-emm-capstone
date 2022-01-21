import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import "./SignupPage.scss";

const signupUrl = `${process.env.REACT_APP_API_URL}/signup`;

class SignupPage extends Component {
  state = {
    isSignedUp: false,
    isLoginError: false,
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
        this.setState({
          isSignedUp: true
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
            Name: <input type="text" name="preferredName" />
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

  render() {
    if (this.state.isSignedUp) {
      return <Redirect to="/" />;
    }
    return this.renderSignUp();
  }
}

export default SignupPage;
