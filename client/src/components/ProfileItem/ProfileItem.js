import "../ProfileItem/ProfileItem.scss";
import Card from "../Card/Card";

import React from "react";

const ProfileItem = (props) => {
  return (
    <Card>
      <h2 className="profile-item__title">{props.heading}</h2>
      <h3 className="profile-item__heading">Name:</h3>{" "}
      <p className="profile-item__value">{props.name}</p>
      <h3 className="profile-item__heading">Phone Number:</h3>{" "}
      <p className="profile-item__value">{props.phone}</p>
      {/* <LabelValue label="Name:" value={props.name} />
      {/* <h3>G.P. Name:</h3>{" "} */}
      {/* <LabelValue label="Phone Number:" value={props.phone} /> */}
      {/* <h3>Phone Number:</h3>
    <span>
      {profile.familyDoctor ? profile.familyDoctor.phone : ""}
    </span> */}
    </Card>
  );
};

export default ProfileItem;
