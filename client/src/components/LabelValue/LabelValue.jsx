import "../LabelValue/LabelValue.scss";

import React from "react";

const LabelValue = (props) => {
  return (
    <div className="label-value-container">
      <p className="label-value-container__label">{props.label}</p>
      <p className="label-value-container__value">{props.value}</p>
    </div>
  );
};

export default LabelValue;
