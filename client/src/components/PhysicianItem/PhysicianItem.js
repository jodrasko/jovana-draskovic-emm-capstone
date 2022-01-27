import { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "../PhysicianItem/PhysicianItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

class PhysicianItem extends Component {
  handleClickEdit = (e) => {
    e.preventDefault();
    this.props.history.push(
      `/edit-physician/${this.props.physician.physicianId}`
    );
  };

  render() {
    return (
      <>
        <Card>
          <div className="physician-item">
            <h3 className="physician-item__heading">
              {this.props.physician.name}
            </h3>
            <p>{this.props.physician.specialty}</p>
            <p>{this.props.physician.phone}</p>
          </div>
          <div className="physician-action">
            <Link
              to={`/edit-physician/${this.props.physician.physicianId}`}
              className="physician-action__link"
            >
              <img src={editIcon} alt="edit icon" />
            </Link>
            <img
              src={deleteIcon}
              alt="delete icon"
              onClick={() =>
                this.props.onClick(
                  this.props.physician.physicianId,
                  this.props.physician.name
                )
              }
            />
          </div>
        </Card>
      </>
    );
  }
}

export default PhysicianItem;
