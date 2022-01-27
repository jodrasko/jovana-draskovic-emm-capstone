import "../ProfileItem/ProfileItem.scss";
import Card from "../Card/Card";

import React from "react";

const ProfileItem = (props) => {
  return (
    <Card>
      <div className="profile-item">
        <h2 className="profile-item__title">{props.heading}</h2>
        <h3 className="profile-item__heading">Name:</h3>{" "}
        <p className="profile-item__value">{props.name}</p>
        <h3 className="profile-item__heading">Phone Number:</h3>{" "}
        <p className="profile-item__value">{props.phone}</p>
      </div>
    </Card>
  );
};

export default ProfileItem;
