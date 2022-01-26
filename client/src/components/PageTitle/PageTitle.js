import "../PageTitle/PageTitle.scss";
import Button from "../Button/Button";

import React from "react";

const PageTitle = (props) => {
  return (
    <div className="page-title-container">
      <h1 className="page-title-container__heading">{props.title}</h1>
      {props.type ? (
        <div className="page-title-container__button">
          {props.type === "edit" ? (
            <Button type="edit" value="Edit" onClick={props.onClick} />
          ) : (
            <Button
              type={props.type}
              value={props.buttonValue}
              onClick={props.onClick}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageTitle;
