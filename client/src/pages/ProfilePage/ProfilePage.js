import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

class ProfilePage extends Component {
  state = {
    isLoading: true,
    profile: {}
  };
  componentDidMount() {
    // here grab token from sessionStorage
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    const profileUrl = `${process.env.REACT_APP_API_URL}/profile/${profileId}`;
    axios
      .get(profileUrl, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          profile: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log("render");

    const { isLoading, profile } = this.state;

    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="container">
        <div className="left-box">
          <Sidebar />
        </div>

        <div className="right-box">
          <button type="button" onClick={this.hideContent}>
            Back
          </button>
          <h1>{profile.preferredName}'s Profile</h1>

          <div>
            <h2>Family Doctor:</h2>
            <h3>G.P. Name:</h3>{" "}
            <span>{profile.familyDoctor ? profile.familyDoctor.name : ""}</span>
            <h3>Phone Number:</h3>
            <span>
              {profile.familyDoctor ? profile.familyDoctor.phone : ""}
            </span>
          </div>

          <div>
            <h2>Emergency Contact:</h2>
            <h3>Name:</h3>{" "}
            <span>
              {profile.emergencyContact ? profile.emergencyContact.name : ""}
            </span>
            <h3>Phone Number:</h3>{" "}
            <span>
              {profile.emergencyContact ? profile.emergencyContact.phone : ""}
            </span>
          </div>
          <div>
            <h2>Pharmacy Information:</h2>
            <h3>Name:</h3>{" "}
            <span>{profile.pharmacyInfo ? profile.pharmacyInfo.name : ""}</span>
            <h3>Phone Number:</h3>{" "}
            <span>
              {profile.pharmacyInfo ? profile.pharmacyInfo.phone : ""}
            </span>
          </div>

          <Link to="/edit-profile">Edit</Link>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
