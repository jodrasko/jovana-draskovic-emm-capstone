import "../ProfileItem/ProfileItem.scss";
import Card from "../Card/Card";
import LabelValue from "../LabelValue/LabelValue";

import React from "react";

const ProfileItem = (props) => {
  return (
    <Card>
      <h2 className="profile-item__heading">{props.heading}</h2>
      <LabelValue label="Name:" value={props.name} />
      {/* <h3>G.P. Name:</h3>{" "} */}
      <LabelValue label="Phone Number:" value={props.phone} />
      {/* <h3>Phone Number:</h3>
    <span>
      {profile.familyDoctor ? profile.familyDoctor.phone : ""}
    </span> */}
    </Card>
  );
};

export default ProfileItem;
