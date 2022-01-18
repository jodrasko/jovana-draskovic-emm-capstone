// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
import Card from "../Card/Card";
import "../PhysicianItem/PhysicianItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

// const baseUrl = "http://localhost:8080";
// const signupUrl = `${baseUrl}/signup`;

class PhysicianItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  // {
  //   "physicianId": "1",
  //   "name": "Dr. Andrew Seabrook",
  //   "phone": "6041116201",
  //   "specialty": "Endocrinology"
  // }

  render() {
    console.log("physician=", this.props.physician);
    return (
      <>
        <Card>
          <div>
            <h3>Physician Name:</h3> <span>{this.props.physician.name}</span>
            <h3>Specialty:</h3> <span>{this.props.physician.specialty}</span>
            <h3>Phone Number:</h3> <span>{this.props.physician.phone}</span>
          </div>
          <Link to={`/edit-physician/${this.props.physician.physicianId}`}>
            <img className="warehouse__icon" src={editIcon} alt="edit icon" />
          </Link>
          <img
            className="warehouse__icon"
            src={deleteIcon}
            alt="delete icon"
            onClick={() =>
              this.props.onClick(
                this.props.physician.physicianId,
                this.props.physician.name
              )
            }
          />
        </Card>
      </>
    );
  }
}

export default PhysicianItem;
