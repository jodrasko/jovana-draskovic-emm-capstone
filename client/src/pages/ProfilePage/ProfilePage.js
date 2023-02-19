import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import "./ProfilePage.scss";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import PageTitle from "../../components/PageTitle/PageTitle";

const token = sessionStorage.getItem("token");
const profileId = sessionStorage.getItem("profileId");

const ProfilePage = (props) => {
  console.log("[ProfilePage] props=", props);
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [isLogoutError, setLogoutError] = useState(false);
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("[ProfilePage] profileId=", profileId);
    const path = `/edit-profile/${profileId}`;
    console.log("path=", path);
    props.history.push(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      // take token from sessionStorage
      console.log("[ProfilePage] fetchData profileId=", profileId);
      const profileUrl = `${process.env.REACT_APP_API_URL}/profile/${profileId}`;
      await axios
        .get(profileUrl, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setProfile(response.data);
          setLoading(false);
        })
        .catch((err) => {
          let message = "";
          if (err.response && err.response.data) {
            message = err.response.data.error;
          } else {
            message = err.message;
          }
          setLoading(false);
          setLogoutError(true);
          setErrorMessage(message);
        });
    };
    fetchData();
  }, [isLoading]);

  if (isLogoutError) {
    return (
      <SidebarAndCard>
        <p className="profile__error">{errorMessage}</p>
      </SidebarAndCard>
    );
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SidebarAndCard>
      <PageTitle
        title={`${profile.preferredName}'s Profile`}
        type="edit"
        onClick={handleClick}
        buttonValue=""
      />
      {isLogoutError && <p className="profile__error">{errorMessage}</p>}
      <div className="profile-list">
        <ProfileItem
          heading="Family Doctor"
          name={profile.familyDoctor ? profile.familyDoctor.name : ""}
          phone={profile.familyDoctor ? profile.familyDoctor.phone : ""}
        />

        <ProfileItem
          heading="Emergency Contact"
          name={profile.emergencyContact ? profile.emergencyContact.name : ""}
          phone={profile.emergencyContact ? profile.emergencyContact.phone : ""}
        />

        <ProfileItem
          heading="Pharmacy Information"
          name={profile.pharmacyInfo ? profile.pharmacyInfo.name : ""}
          phone={profile.pharmacyInfo ? profile.pharmacyInfo.phone : ""}
        />
      </div>
    </SidebarAndCard>
  );
};

export default withRouter(ProfilePage);
