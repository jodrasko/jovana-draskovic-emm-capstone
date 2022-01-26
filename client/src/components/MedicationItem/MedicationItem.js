import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import getFormattedDate from "../../util/helpers";
import "../MedicationItem/MedicationItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

class MedicationItem extends Component {
  state = {
    physicianName: ""
  };

  isRefillAlert(timestamp) {
    const expirationDate = new Date(timestamp);

    // add 7 days from current date
    let date = new Date();
    date.setDate(date.getDate() + 7);

    const result = expirationDate < date;
    return result;
  }

  componentDidMount() {
    // take token from sessionStorage
    const token = sessionStorage.getItem("token");

    const url = `${process.env.REACT_APP_API_URL}/physician/${this.props.medication.physicianId}`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          physicianName: response.data.name
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <Card>
          <div className="medication-item">
            <h3 className="medication-item__heading">Physician:</h3>{" "}
            <p className="medication-item__value">{this.state.physicianName}</p>
            <h3 className="medication-item__heading">Medication:</h3>{" "}
            <p className="medication-item__value">
              {this.props.medication.name}
            </p>
            <h3 className="medication-item__heading">Dosage:</h3>{" "}
            <p className="medication-item__value">
              {this.props.medication.dosage}
            </p>
            <h3 className="medication-item__heading">
              Refill Expiration Date:
            </h3>
            <p
              className={
                this.isRefillAlert(this.props.medication.refillExpireDate)
                  ? "medication-item__value medication-item__alert"
                  : "medication-item__value"
              }
            >
              {getFormattedDate(
                new Date(this.props.medication.refillExpireDate)
              )}
            </p>
          </div>

          <div className="medication-action">
            <Link to={`/edit-medication/${this.props.medication.medicationId}`}>
              <img src={editIcon} alt="edit icon" />
            </Link>
            <img
              src={deleteIcon}
              alt="delete icon"
              onClick={() =>
                this.props.onClick(
                  this.props.medication.medicationId,
                  this.props.medication.name
                )
              }
            />
          </div>
        </Card>
      </>
    );
  }
}

export default MedicationItem;
