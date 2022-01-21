import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import "./EditPhysician.scss";

class EditPhysician extends Component {
  state = {
    isLoading: true,
    isSavedPhysician: false,
    isAdd: false,

    name: "",
    phone: "",
    specialty: ""
  };

  handleClickCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/physicians");
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
    console.log(this.state.name);
    if (this.state.isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/physician`;
      axios
        .post(url, {
          name: this.state.name,
          phone: this.state.phone,
          specialty: this.state.specialty
        })
        .then((res) => {
          this.setState({
            isSavedPhysician: true
          });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/physician/${this.props.match.params.physicianId}`;
      // using input required attributes and default browser field validations
      axios
        .put(url, {
          name: this.state.name,
          phone: this.state.phone,
          specialty: this.state.specialty
        })
        .then((res) => {
          this.setState({
            isSavedPhysician: true
          });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
    e.target.reset();
  };

  componentDidMount() {
    // here grab token from sessionStorage
    // const token = sessionStorage.getItem("token");
    // const profileId = sessionStorage.getItem("profileId");
    if (this.props.match.params.physicianId) {
      const url = `${process.env.REACT_APP_API_URL}/physician/${this.props.match.params.physicianId}`;

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.setState({
            isLoading: false,
            name: response.data.name,
            phone: response.data.phone,
            specialty: response.data.specialty
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        isAdd: true,
        isLoading: false
      });
    }
  }

  render() {
    const { isAdd, isLoading, isSavedPhysician } = this.state;
    console.log("render state=", this.state);
    if (isSavedPhysician) {
      return <Redirect to="/physicians" />;
    }
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <SidebarAndCard>
        <h1> {isAdd ? "Add" : "Edit"} Physician</h1>
        <label style={{ color: "blue" }}>All fields are mandatory.</label>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">G.P. Name:</label>
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              value={this.state.phone}
              name="phone"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="specialty">Specialty:</label>{" "}
            <input
              type="text"
              value={this.state.specialty}
              name="specialty"
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

export default EditPhysician;
