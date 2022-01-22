import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import LabelValue from "../../components/LabelValue/LabelValue";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import PageTitle from "../../components/PageTitle/PageTitle";

class ProfilePage extends Component {
  state = {
    isLoading: true,
    profile: {}
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/edit-profile");
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
      <SidebarAndCard>
        <PageTitle
          title={`${profile.preferredName}'s Profile`}
          type="edit"
          onClick={this.handleClick}
          buttonValue=""
        />
        {/* <div></div>
        <h1>{profile.preferredName}'s Profile</h1>
        <Link to="/edit-profile">Edit</Link> */}

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
      </SidebarAndCard>
    );
  }
}

export default ProfilePage;
