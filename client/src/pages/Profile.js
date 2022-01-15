import axios from "axios";
import { Component } from "react";

const baseUrl = "http://localhost:8080";
const profileUrl = `${baseUrl}/new-profile`;

class Profile extends Component {
  state = {
    isLoading: true,
    userInfo: {}
  };
  componentDidMount() {
    // here grab token from sessionStorage
    const token = sessionStorage.getItem("token");

    axios
      .get(profileUrl, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          userInfo: response.data
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { isLoading, userInfo } = this.state;
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <h1>Welcome {userInfo.preferredName}!</h1>
    );
  }
}

export default Profile;
