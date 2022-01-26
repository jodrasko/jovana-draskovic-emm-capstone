import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import getFormattedDate from "../../util/helpers";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./EditMedication.scss";

class EditMedication extends Component {
  state = {
    isLoading: true,
    isSavedMedication: false,
    isAdd: false,
    physicians: [],
    name: "",
    dosage: "",
    refillExpireDate: "",
    physicianId: ""
  };

  handleClickCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/medications");
  };

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value // property name, value
    });
  };

  parseDate(dateStr) {
    const arr = dateStr.split("-");
    console.log("arr=", arr);

    const d = new Date(
      parseInt(arr[0]),
      parseInt(arr[1]) - 1,
      parseInt(arr[2])
    );
    return d;
  }

  // submit form
  handleSubmit = (e) => {
    e.preventDefault();
    const d = this.parseDate(this.state.refillExpireDate);
    console.log(this.state.name);
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    if (this.state.isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/medication`;
      axios
        .post(
          url,
          {
            name: this.state.name,
            dosage: this.state.dosage,
            refillExpireDate: d.getTime(),
            physicianId: this.state.physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          this.setState({
            isSavedMedication: true
          });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/medication/${this.props.match.params.medicationId}`;
      // using input required attributes and built-in browser field validations
      axios
        .put(
          url,
          {
            name: this.state.name,
            dosage: this.state.dosage,
            refillExpireDate: d.getTime(),
            physicianId: this.state.physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          this.setState({
            isSavedMedication: true
          });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
    e.target.reset();
  };

  getAllPhysicians() {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/physician`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          physicians: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // take token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (this.props.match.params.medicationId) {
      const url = `${process.env.REACT_APP_API_URL}/medication/${this.props.match.params.medicationId}`;

      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
          console.log(response);
          this.setState({
            isLoading: false,
            name: response.data.name,
            dosage: response.data.dosage,
            refillExpireDate: getFormattedDate(
              new Date(response.data.refillExpireDate)
            ),
            physicianId: response.data.physicianId
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        isAdd: true,
        isLoading: false
      });
    }

    // Read all physicians
    this.getAllPhysicians();
  }

  render() {
    const { isAdd, isLoading, isSavedMedication } = this.state;
    console.log("render state=", this.state);
    if (isSavedMedication) {
      return <Redirect to="/medications" />;
    }
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <SidebarAndCard>
        <div className="edit-medication">
          <h1 className="edit-medication__heading">
            {" "}
            {isAdd ? "Add" : "Edit"} Medication
          </h1>
          <Card>
            <div className="edit-medication__message">
              <span>All fields are mandatory.</span>
            </div>
            <form onSubmit={this.handleSubmit} className="medication-form">
              <div className="medication-form__item">
                <label htmlFor="name" className="medication-form__label">
                  Medication:
                </label>
                <input
                  type="text"
                  className="medication-form__input"
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="dosage" className="medication-form__label">
                  Dosage:
                </label>
                <input
                  type="text"
                  className="medication-form__input"
                  value={this.state.dosage}
                  name="dosage"
                  onChange={this.handleChange}
                  required
                />
                <label
                  htmlFor="refillExpireDate"
                  className="medication-form__label"
                >
                  Refill Expiration Date:
                </label>{" "}
                <input
                  type="date"
                  className="medication-form__input"
                  value={this.state.refillExpireDate}
                  name="refillExpireDate"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="physicianId" className="medication-form__label">
                  Physician:
                </label>{" "}
                <select
                  name="physicianId"
                  className="medication-form__select-option"
                  id="physicianId"
                  value={this.state.physicianId}
                  onChange={this.handleChange}
                  required
                >
                  <option value="" className="medication-form__option">
                    Please select
                  </option>
                  {this.state.physicians.map((physician, i) => {
                    return (
                      <option
                        key={i}
                        value={physician.physicianId}
                        className="medication-form__option"
                      >
                        {physician.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="medication-form__action">
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

export default EditMedication;
