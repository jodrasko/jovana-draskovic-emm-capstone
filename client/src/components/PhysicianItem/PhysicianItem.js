import { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "../PhysicianItem/PhysicianItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

class PhysicianItem extends Component {
  render() {
    console.log("physician=", this.props.physician);
    return (
      <>
        <Card>
          <div className="physician-item">
            <h3>{this.props.physician.name}</h3>

            {/* <p>{this.props.physician.name}</p> */}
            {/* <h3>Specialty:</h3>  */}
            <p>{this.props.physician.specialty}</p>
            {/* <h3>Phone Number:</h3>  */}
            <p>{this.props.physician.phone}</p>
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
