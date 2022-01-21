import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";

class EditProfile extends Component {
  state = {
    isLoading: true,
    isSavedProfile: false,

    familyDoctorName: "",
    familyDoctorPhone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    pharmacyInfoName: "",
    pharmacyInfoPhone: ""
  };

  handleClickCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/profile");
  };

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value // property name, value
    });
  };

  // submit form
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.familyDoctorName);

    const profileId = sessionStorage.getItem("profileId");
    const url = `${process.env.REACT_APP_API_URL}/profile/${profileId}`;
    // using input required attributes and default browser field validations
    axios
      .put(url, {
        familyDoctor: {
          name: this.state.familyDoctorName,
          phone: this.state.familyDoctorPhone
        },
        emergencyContact: {
          name: this.state.emergencyContactName,
          phone: this.state.emergencyContactPhone
        },
        pharmacyInfo: {
          name: this.state.pharmacyInfoName,
          phone: this.state.pharmacyInfoPhone
        }
      })
      .then((res) => {
        this.setState({
          isSavedProfile: true
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    e.target.reset();
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
          familyDoctorName: response.data.familyDoctor
            ? response.data.familyDoctor.name
            : "",
          familyDoctorPhone: response.data.familyDoctor
            ? response.data.familyDoctor.phone
            : "",
          emergencyContactName: response.data.emergencyContact
            ? response.data.emergencyContact.name
            : "",
          emergencyContactPhone: response.data.emergencyContact
            ? response.data.emergencyContact.phone
            : "",
          pharmacyInfoName: response.data.pharmacyInfo
            ? response.data.pharmacyInfo.name
            : "",
          pharmacyInfoPhone: response.data.pharmacyInfo
            ? response.data.pharmacyInfo.phone
            : ""
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { isLoading, isSavedProfile } = this.state;
    console.log("render state=", this.state);
    if (isSavedProfile) {
      return <Redirect to="/profile" />;
    }
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <SidebarAndCard>
        <h1>Edit Profile</h1>
        <label style={{ color: "blue" }}>All fields are mandatory.</label>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h2>Family Doctor:</h2>
            <label htmlFor="familyDoctorName">G.P. Name:</label>
            <input
              type="text"
              value={this.state.familyDoctorName}
              name="familyDoctorName"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="familyDoctorPhone">Phone Number:</label>
            <input
              type="text"
              value={this.state.familyDoctorPhone}
              name="familyDoctorPhone"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <h2>Emergency Contact:</h2>
            <label htmlFor="emergencyContactName">Name:</label>{" "}
            <input
              type="text"
              value={this.state.emergencyContactName}
              name="emergencyContactName"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="emergencyContactPhone">Phone Number:</label>{" "}
            <input
              type="text"
              value={this.state.emergencyContactPhone}
              name="emergencyContactPhone"
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <h2>Pharmacy Information:</h2>
            <label htmlFor="pharmacyInfoName">Name:</label>{" "}
            <input
              type="text"
              value={this.state.pharmacyInfoName}
              name="pharmacyInfoName"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="pharmacyInfoPhone">Phone Number:</label>
            <input
              type="text"
              value={this.state.pharmacyInfoPhone}
              name="pharmacyInfoPhone"
              onChange={this.handleChange}
              required
            />
          </div>
          <br></br>
          <div>
            <button className="btn btn-primary" type="submit">
              SAVE
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleClickCancel}
            >
              CANCEL
            </button>
          </div>
        </form>
      </SidebarAndCard>
    );
  }
}

export default EditProfile;