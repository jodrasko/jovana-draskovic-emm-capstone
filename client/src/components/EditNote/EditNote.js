import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";
import getFormattedDate from "../../util/helpers";
import "../EditNote/EditNote.scss";

class EditNote extends Component {
  state = {
    isLoading: true,
    isSavedNote: false,
    isAdd: false,
    physicians: [],
    complaintRemark: "",
    consultRemark: "",
    appointmentDate: "",
    physicianId: ""
  };

  handleClickCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/notes");
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
    const d = this.parseDate(this.state.appointmentDate);
    console.log(this.state.appointmentDate);
    const profileId = sessionStorage.getItem("profileId");
    if (this.state.isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/note`;
      axios
        .post(url, {
          remark: {
            complaint: this.state.complaintRemark,
            consult: this.state.consultRemark
          },
          date: d.getTime(),
          physicianId: this.state.physicianId,
          profileId: profileId
        })
        .then((res) => {
          this.setState({
            isSavedNote: true
          });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/note/${this.props.match.params.noteId}`;
      // using input required attributes and default browser field validations
      axios
        .put(url, {
          remark: {
            complaint: this.state.complaintRemark,
            consult: this.state.consultRemark
          },
          date: d.getTime(),
          physicianId: this.state.physicianId,
          profileId: profileId
        })
        .then((res) => {
          this.setState({
            isSavedNote: true
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
    if (this.props.match.params.noteId) {
      const url = `${process.env.REACT_APP_API_URL}/note/${this.props.match.params.noteId}`;

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.setState({
            isLoading: false,
            complaintRemark: response.data.remark.complaint,
            consultRemark: response.data.remark.consult,
            appointmentDate: getFormattedDate(new Date(response.data.date)),
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
    const { isAdd, isLoading, isSavedNote } = this.state;
    console.log("render state=", this.state);
    if (isSavedNote) {
      return <Redirect to="/notes" />;
    }
    return isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <h1> {isAdd ? "Add" : "Edit"} Note</h1>
        <label style={{ color: "blue" }}>All fields are mandatory.</label>
        <form onSubmit={this.handleSubmit}>
          <div>
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
            <br></br>
            <label htmlFor="appointmentDate">Appointment Date:</label>{" "}
            <input
              type="date"
              value={this.state.appointmentDate}
              name="appointmentDate"
              onChange={this.handleChange}
              required
            />
            <h2>Remarks:</h2>
            <label htmlFor="complaintRemark">Complaint:</label>
            <textarea
              className="publish-form__description"
              value={this.state.complaintRemark}
              name="complaintRemark"
              id="complaintRemark"
              placeholder="Add a complaint note"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="consultRemark">Consult:</label>
            <textarea
              className="publish-form__description"
              value={this.state.consultRemark}
              name="consultRemark"
              id="consultRemark"
              placeholder="Add a consult note"
              onChange={this.handleChange}
            ></textarea>
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

export default EditNote;
