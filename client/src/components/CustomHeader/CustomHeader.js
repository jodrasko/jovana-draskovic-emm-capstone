import React from "react";
import EmmLogo from "../../assets/images/Icons/logo.svg";
import "../CustomHeader/CustomHeader.scss";

const CustomHeader = () => {
  return (
    <header className="custom-header">
      <div className="custom-header__box">
        <img src={EmmLogo} alt="eMM logo" className="custom-header__logo" />
      </div>
    </header>
  );
};

export default CustomHeader;
