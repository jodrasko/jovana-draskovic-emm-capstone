import { Component } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./MainPage.scss";

class MainPage extends Component {
  handleClickLogin = (e) => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  handleClickSignup = (e) => {
    e.preventDefault();
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div className="main">
        <CustomHeader />
        <div className="main__content">
          <Card>
            <div className="main__details">
              <h1 className="main__heading">
                Welcome to Electronic Medical Management!
              </h1>

              <div className="main__details">
                <p className="main__phrase">
                  An electronic medical management web application that allows
                  users to store their medical information, keep track of their
                  medications, physicians, and consult notes.
                </p>
              </div>
            </div>
            <div className="main__action">
              <Button
                value="Signup"
                type="primary"
                onClick={this.handleClickSignup}
              />

              <Button
                value="Login"
                type="secondary"
                onClick={this.handleClickLogin}
              />
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
