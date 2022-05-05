import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
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
    this.setState({
      [e.target.name]: e.target.value // property name, value
    });
  };

  // submit form
  handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (this.state.isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/physician`;
      axios
        .post(
          url,
          {
            name: this.state.name,
            phone: this.state.phone,
            specialty: this.state.specialty
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
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
      // using input required attributes and built-in browser field validations
      axios
        .put(
          url,
          {
            name: this.state.name,
            phone: this.state.phone,
            specialty: this.state.specialty
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
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
    // take token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (this.props.match.params.physicianId) {
      const url = `${process.env.REACT_APP_API_URL}/physician/${this.props.match.params.physicianId}`;

      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
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
    if (isSavedPhysician) {
      return <Redirect to="/physicians" />;
    }
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <SidebarAndCard>
        <div className="edit-physician">
          <h1 className="edit-physician__heading">
            {" "}
            {isAdd ? "Add" : "Edit"} Physician
          </h1>
          <Card>
            <div className="edit-physician__message">
              <span>All fields are mandatory.</span>
            </div>
            <form onSubmit={this.handleSubmit} className="physician-form">
              <div className="physician-form__item">
                <label htmlFor="name" className="physician-form__label">
                  Name:
                </label>
                <input
                  type="text"
                  className="physician-form__input"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="phone" className="physician-form__label">
                  Phone Number:
                </label>
                <input
                  type="text"
                  className="physician-form__input"
                  value={this.state.phone}
                  name="phone"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="specialty" className="physician-form__label">
                  Specialty:
                </label>{" "}
                <input
                  type="text"
                  className="physician-form__input"
                  value={this.state.specialty}
                  name="specialty"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="physician-form__action">
                <Button value="Save" type="primary" />

                <Button
                  value="Cancel"
                  type="secondary"
                  onClick={this.handleClickCancel}
                />
              </div>
            </form>
          </Card>
        </div>
      </SidebarAndCard>
    );
  }
}

export default EditPhysician;
