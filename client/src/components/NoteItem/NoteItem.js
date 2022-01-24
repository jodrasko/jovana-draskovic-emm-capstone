import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import getFormattedDate from "../../util/helpers";
import "../NoteItem/NoteItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

class NoteItem extends Component {
  state = {
    physicianName: ""
  };

  componentDidMount() {
    // here grab token from sessionStorage
    // const token = sessionStorage.getItem("token");
    // const profileId = sessionStorage.getItem("profileId");

    const url = `${process.env.REACT_APP_API_URL}/physician/${this.props.note.physicianId}`;

    axios
      .get(url)
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
    console.log("note=", this.props.note);
    return (
      <>
        <Card>
          <div className="note-item">
            <h3 className="note-item__heading">Physician:</h3>{" "}
            <p className="note-item__value">{this.state.physicianName}</p>
            <h3 className="note-item__heading">Complaint:</h3>{" "}
            <p className="note-item__value">
              {this.props.note.remark.complaint}
            </p>
            <h3 className="note-item__heading">Consult:</h3>{" "}
            <p className="note-item__value">{this.props.note.remark.consult}</p>
            <h3 className="note-item__heading">Appointment Date:</h3>
            <p className="note-item__value">
              {getFormattedDate(new Date(this.props.note.date))}
            </p>
          </div>

          <div className="note-action">
            <Link to={`/edit-note/${this.props.note.noteId}`}>
              <img className="warehouse__icon" src={editIcon} alt="edit icon" />
            </Link>
            <img
              className="warehouse__icon"
              src={deleteIcon}
              alt="delete icon"
              onClick={() =>
                this.props.onClick(
                  this.props.note.noteId,
                  this.state.physicianName,
                  this.props.note.remark
                )
              }
            />
          </div>
        </Card>
      </>
    );
  }
}

export default NoteItem;
