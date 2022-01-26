import EmmLogo from "../../assets/images/Icons/logo.svg";
import "../CustomHeader/CustomHeader.scss";
import React, { Component } from "react";

class CustomHeader extends Component {
  render() {
    return (
      <header className="custom-header">
        <div className="custom-header__box">
          <img src={EmmLogo} alt="eMM logo" className="custom-header__logo" />
        </div>
      </header>
    );
  }
}

export default CustomHeader;
