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
          <div>
            <h3>Physician:</h3> <span>{this.state.physicianName}</span>
            <h3>Complaint:</h3> <span>{this.props.note.remark.complaint}</span>
            <h3>Consult:</h3> <span>{this.props.note.remark.consult}</span>
            <h3>Appointment Date:</h3>
            <span className="comment__value">
              {getFormattedDate(new Date(this.props.note.date))}
            </span>
          </div>
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
        </Card>
      </>
    );
  }
}

export default NoteItem;
