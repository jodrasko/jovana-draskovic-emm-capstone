import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect, matchPath } from "react-router";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "../EditProfile/EditProfile.scss";
import { useParams, useHistory, withRouter } from "react-router-dom";

const token = sessionStorage.getItem("token");
// const profileId = sessionStorage.getItem("profileId");

const EditProfile = (props) => {
  console.log("[EditProfile] props=", props);
  //const params = useParams();
  const match = matchPath(props.location.pathname, {
    path: "/edit-profile/:profileId"
  });
  console.log("match=", match);
  const params = match.params;
  console.log("params=", params);
  const { profileId } = params;
  console.log("profileId=", profileId);
  console.log("edit profile render");
  // const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [isSavedProfile, setSavedProfile] = useState(false);
  const [familyDoctorName, setFamilyDoctorName] = useState();
  const [familyDoctorPhone, setFamilyDoctorPhone] = useState();
  const [emergencyContactName, setEmergencyContactName] = useState();
  const [emergencyContactPhone, setEmergencyContactPhone] = useState();
  const [pharmacyInfoName, setPharmacyInfoName] = useState();
  const [pharmacyInfoPhone, setPharmacyInfoPhone] = useState();

  const handleClickCancel = (e) => {
    e.preventDefault();
    props.history.push("/profile");
  };

  const handleChange = (e) => {
    console.log("target name =", e.target.name);
    console.log("target value =", e.target.value);
    if (e.target.name === "familyDoctorName") {
      setFamilyDoctorName(e.target.value);
    } else if (e.target.name === "familyDoctorPhone") {
      setFamilyDoctorPhone(e.target.value);
    } else if (e.target.name === "emergencyContactName") {
      setEmergencyContactName(e.target.value);
    } else if (e.target.name === "emergencyContactPhone") {
      setEmergencyContactPhone(e.target.value);
    } else if (e.target.name === "pharmacyInfoName") {
      setPharmacyInfoName(e.target.value);
    } else if (e.target.name === "pharmacyInfoPhone") {
      setPharmacyInfoPhone(e.target.value);
    }
  };

  // submit form
  const handleSubmit = (e) => {
    console.log("handle submit=", e);
    e.preventDefault();

    console.log("profile id=", profileId);
    const url = `${process.env.REACT_APP_API_URL}/profile/${profileId}`;
    // using input required attributes and built-in browser field validations
    axios
      .put(
        url,
        {
          familyDoctor: {
            name: familyDoctorName,
            phone: familyDoctorPhone
          },
          emergencyContact: {
            name: emergencyContactName,
            phone: emergencyContactPhone
          },
          pharmacyInfo: {
            name: pharmacyInfoName,
            phone: pharmacyInfoPhone
          }
        },
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then((res) => {
        console.log("saved profile");
        setSavedProfile(true);
        console.log("after saved profile");
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    e.target.reset();
  };

  useEffect(() => {
    // take token from sessionStorage
    console.log("useEffect get profile");
    console.log("profileId=", profileId);

    const profileUrl = `${process.env.REACT_APP_API_URL}/profile/${profileId}`;
    axios
      .get(profileUrl, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setFamilyDoctorName(
          response.data.familyDoctor ? response.data.familyDoctor.name : ""
        );
        setFamilyDoctorPhone(
          response.data.familyDoctor ? response.data.familyDoctor.phone : ""
        );

        setEmergencyContactName(
          response.data.emergencyContact
            ? response.data.emergencyContact.name
            : ""
        );
        setEmergencyContactPhone(
          response.data.emergencyContact
            ? response.data.emergencyContact.phone
            : ""
        );
        setPharmacyInfoName(
          response.data.pharmacyInfo ? response.data.pharmacyInfo.name : ""
        );
        setPharmacyInfoPhone(
          response.data.pharmacyInfo ? response.data.pharmacyInfo.phone : ""
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [isLoading]);

  // const { isLoading, isSavedProfile } = this.state;
  if (isSavedProfile) {
    console.log("redirect to profile");
    return <Redirect to="/profile" />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SidebarAndCard>
      <div className="edit-profile">
        <h1 className="edit-profile__heading">Edit Profile</h1>
        <Card>
          <div className="edit-profile__message">
            <span>All fields are mandatory.</span>
          </div>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form__item">
              <h2 className="profile-form__heading">Family Doctor</h2>
              <label htmlFor="familyDoctorName" className="profile-form__label">
                Name:
              </label>
              <input
                type="text"
                className="profile-form__input"
                value={familyDoctorName}
                name="familyDoctorName"
                onChange={handleChange}
                required
              />

              <label
                htmlFor="familyDoctorPhone"
                className="profile-form__label"
              >
                Phone Number:
              </label>
              <input
                type="text"
                className="profile-form__input"
                value={familyDoctorPhone}
                name="familyDoctorPhone"
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-form__item">
              <h2 className="profile-form__heading">Emergency Contact</h2>
              <label
                htmlFor="emergencyContactName"
                className="profile-form__label"
              >
                Name:
              </label>{" "}
              <input
                type="text"
                className="profile-form__input"
                value={emergencyContactName}
                name="emergencyContactName"
                onChange={handleChange}
                required
              />
              <label
                htmlFor="emergencyContactPhone"
                className="profile-form__label"
              >
                Phone Number:
              </label>{" "}
              <input
                type="text"
                className="profile-form__input"
                value={emergencyContactPhone}
                name="emergencyContactPhone"
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-form__item">
              <h2 className="profile-form__heading">Pharmacy Information</h2>
              <label htmlFor="pharmacyInfoName" className="profile-form__label">
                Name:
              </label>{" "}
              <input
                type="text"
                className="profile-form__input"
                value={pharmacyInfoName}
                name="pharmacyInfoName"
                onChange={handleChange}
                required
              />
              <label
                htmlFor="pharmacyInfoPhone"
                className="profile-form__label"
              >
                Phone Number:
              </label>
              <input
                type="text"
                className="profile-form__input"
                value={pharmacyInfoPhone}
                name="pharmacyInfoPhone"
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form__action">
              <Button value="Save" type="primary" />

              <Button
                value="Cancel"
                type="secondary"
                onClick={handleClickCancel}
              />
            </div>
          </form>
        </Card>
      </div>
    </SidebarAndCard>
  );
};
export default withRouter(EditProfile);
