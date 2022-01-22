import "../PageTitle/PageTitle.scss";
import Button from "../Button/Button";

import React from "react";

const PageTitle = (props) => {
  return (
    <div className="page-title-container">
      <h1 className="page-title-container__heading">{props.title}</h1>
      {/* <Link to="/edit-profile">Edit</Link> */}
      {props.type === "edit" ? (
        <Button type="edit" value="Edit" onClick={props.onClick} />
      ) : (
        <Button
          type="primary"
          value={props.buttonValue}
          onClick={props.onClick}
        />
      )}
    </div>
  );
};

export default PageTitle;
