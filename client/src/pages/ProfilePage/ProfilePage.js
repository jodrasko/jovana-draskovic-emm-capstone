import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";

const baseUrl = "http://localhost:8080";
//const profileUrl = `${baseUrl}/new-profile`;
//const profileUrl = `${baseUrl}/profile/${profileId}`;

class Profile extends Component {
  state = {
    isLoading: true,
    profile: {}
  };
  componentDidMount() {
    // here grab token from sessionStorage
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    const profileUrl = `${baseUrl}/profile/${profileId}`;
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
  // [
  //   {
  //     "profileId": "10",
  //     "username": "a@b.com",
  //     "password": "123",
  //     "preferredName": "Arnold",
  //     "familyDoctor": {
  //       "name": "Dr. Isaiah Bregman",
  //       "phone": "6048732255"
  //     },
  //     "emergencyContact": {
  //       "name": "John Doe",
  //       "phone": "6041235555"
  //     },
  //     "pharmacyInfo": {
  //       "name": "Urban Fare",
  //       "phone": "6049757550"
  //     }
  render() {
    const { isLoading, profile } = this.state;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <SidebarAndCard>
        <h1>Welcome {profile.preferredName}!</h1>

        <div>
          <h2>Family Doctor:</h2>
          <h3>G.P. Name:</h3> <span>{profile.familyDoctor.name}</span>
          <h3>Phone Number:</h3>
          <span>{profile.familyDoctor.phone}</span>
        </div>
        <div>
          <h2>Emergency Contact:</h2>
          <h3>Name:</h3> <span>{profile.emergencyContact.name}</span>
          <h3>Phone Number:</h3> <span>{profile.emergencyContact.phone}</span>
        </div>
        <div>
          <h2>Pharmacy Information:</h2>
          <h3>Name:</h3> <span>{profile.pharmacyInfo.name}</span>
          <h3>Phone Number:</h3> <span>{profile.pharmacyInfo.phone}</span>
        </div>

        <Link to="/edit-profile">Edit</Link>
      </SidebarAndCard>
    );
  }
}

export default Profile;
