import EmmLogo from "../../assets/images/Icons/logo.svg";
import "../CustomHeader/CustomHeader.scss";
import React, { Component } from "react";

class CustomHeader extends Component {
  render() {
    return (
      <header className="custom-header">
        <div className="custom-header__box">
          {/* <Link to="/" className="custom-header__link"> */}
          <img src={EmmLogo} alt="eMM logo" className="custom-header__logo" />
          {/* </Link> */}
        </div>
      </header>
    );
  }
}

export default CustomHeader;
