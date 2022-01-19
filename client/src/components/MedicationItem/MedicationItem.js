import { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import getFormattedDate from "../../util/helpers";
import "../MedicationItem/MedicationItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

class MedicationItem extends Component {
  render() {
    console.log("medication=", this.props.medication);
    return (
      <>
        <Card>
          <div>
            <h3>Medication:</h3> <span>{this.props.medication.name}</span>
            <h3>Dosage:</h3> <span>{this.props.medication.dosage}</span>
            <h3>Refill Expiration Date:</h3>
            <span className="comment__value">
              {getFormattedDate(
                new Date(this.props.medication.refillExpireDate)
              )}
            </span>
          </div>
          <Link to={`/edit-medication/${this.props.medication.medicationId}`}>
            <img className="warehouse__icon" src={editIcon} alt="edit icon" />
          </Link>
          <img
            className="warehouse__icon"
            src={deleteIcon}
            alt="delete icon"
            onClick={() =>
              this.props.onClick(
                this.props.medication.medicationId,
                this.props.medication.name
              )
            }
          />
        </Card>
      </>
    );
  }
}

export default MedicationItem;
