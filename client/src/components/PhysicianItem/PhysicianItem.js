import { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "../PhysicianItem/PhysicianItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";
import Button from "../Button/Button";

class PhysicianItem extends Component {
  handleClickEdit = (e) => {
    e.preventDefault();
    this.props.history.push(
      `/edit-physician/${this.props.physician.physicianId}`
    );
  };

  render() {
    console.log("physician=", this.props.physician);
    return (
      <>
        <Card>
          <div className="physician-item">
            <h3 className="physician-item__heading">
              {this.props.physician.name}
            </h3>

            {/* <p>{this.props.physician.name}</p> */}
            {/* <h3>Specialty:</h3>  */}
            <p>{this.props.physician.specialty}</p>
            {/* <h3>Phone Number:</h3>  */}
            <p>{this.props.physician.phone}</p>
          </div>

          {/* <div className="physician-item__action">
            <Button type="edit" value="Edit" onClick={this.handleClickEdit} />

            <Button
              type="icon-delete"
              value=""
              onClick={() =>
                this.props.onClick(
                  this.props.physician.physicianId,
                  this.props.physician.name
                )
              }
            />
          </div> */}

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
