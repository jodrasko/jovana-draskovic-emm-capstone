import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import getFormattedDate from "../../util/helpers";
import "../EditMedication/EditMedication.scss";

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
    const profileId = sessionStorage.getItem("profileId");
    if (this.state.isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/medication`;
      axios
        .post(url, {
          name: this.state.name,
          dosage: this.state.dosage,
          refillExpireDate: d.getTime(),
          physicianId: this.state.physicianId,
          profileId: profileId
        })
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
      // using input required attributes and default browser field validations
      axios
        .put(url, {
          name: this.state.name,
          dosage: this.state.dosage,
          refillExpireDate: d.getTime(),
          physicianId: this.state.physicianId,
          profileId: profileId
        })
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
    const profileId = sessionStorage.getItem("profileId");
    const url = `${process.env.REACT_APP_API_URL}/physician`;

    axios
      .get(url)
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
    // here grab token from sessionStorage
    // const token = sessionStorage.getItem("token");
    // const profileId = sessionStorage.getItem("profileId");
    if (this.props.match.params.medicationId) {
      const url = `${process.env.REACT_APP_API_URL}/medication/${this.props.match.params.medicationId}`;

      axios
        .get(url)
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
      <>
        <h1> {isAdd ? "Add" : "Edit"} Medication</h1>
        <label style={{ color: "blue" }}>All fields are mandatory.</label>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Medication:</label>
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="dosage">Dosage:</label>
            <input
              type="text"
              value={this.state.dosage}
              name="dosage"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="refillExpireDate">
              Refill Expiration Date:
            </label>{" "}
            <input
              type="date"
              value={this.state.refillExpireDate}
              name="refillExpireDate"
              onChange={this.handleChange}
              required
            />
            <br></br>
            <label htmlFor="physicianId">Physician:</label>{" "}
            <select
              name="physicianId"
              id="physicianId"
              value={this.state.physicianId}
              onChange={this.handleChange}
              required
            >
              <option className="inventory-form__option" value="">
                Please select
              </option>
              {this.state.physicians.map((physician, i) => {
                return (
                  <option
                    className="inventory-form__option"
                    key={i}
                    value={physician.physicianId}
                  >
                    {physician.name}
                  </option>
                );
              })}
            </select>
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
      </>
    );
  }
}

export default EditMedication;
