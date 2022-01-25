import axios from "axios";
import { Component } from "react";
import "./ProfilePage.scss";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import PageTitle from "../../components/PageTitle/PageTitle";

class ProfilePage extends Component {
  state = {
    isLoading: true,
    profile: {},
    errorMessage: null,
    isLogoutError: false
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/edit-profile");
  };

  componentDidMount() {
    // here grab token from sessionStorage
    const token = sessionStorage.getItem("token");
    // console.log("[ProfilePage] token=", token);
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
      .catch((err) => {
        console.log("err=", err);
        let message = "";
        if (err.response && err.response.data) {
          console.log("err.response.data=", err.response.data);
          message = err.response.data.error;
        } else {
          console.log("err.message=", err.message);
          message = err.message;
        }
        this.setState({
          isLoading: false,
          isLogoutError: true,
          errorMessage: message
        });
      });
  }

  render() {
    console.log("render");

    const { isLoading, isLogoutError, errorMessage, profile } = this.state;

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
          onClick={this.handleClick}
          buttonValue=""
        />
        {isLogoutError && <p className="profile__error">{errorMessage}</p>}
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
