import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import getFormattedDate from "../../util/helpers";
import "../NoteItem/NoteItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

const NoteItem = (props) => {
  const [physicianName, setPhysicianName] = useState("John Doe");

  useEffect(() => {
    // take token from sessionStorage
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/physician/${props.note.physicianId}`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setPhysicianName(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <Card>
        <div className="note-item">
          <h3 className="note-item__heading">Physician:</h3>{" "}
          <p className="note-item__value">{physicianName}</p>
          <h3 className="note-item__heading">Complaint:</h3>{" "}
          <p className="note-item__value note-item__remark">
            {props.note.remark.complaint}
          </p>
          <h3 className="note-item__heading">Consult:</h3>{" "}
          <p className="note-item__value note-item__remark">
            {props.note.remark.consult}
          </p>
          <h3 className="note-item__heading">Appointment Date:</h3>
          <p className="note-item__value">
            {getFormattedDate(new Date(props.note.date))}
          </p>
        </div>

        <div className="note-action">
          <Link to={`/edit-note/${props.note.noteId}`}>
            <img className="warehouse__icon" src={editIcon} alt="edit icon" />
          </Link>
          <img
            className="warehouse__icon"
            src={deleteIcon}
            alt="delete icon"
            onClick={() =>
              props.onClick(props.note.noteId, physicianName, props.note.remark)
            }
          />
        </div>
      </Card>
    </>
  );
};
export default NoteItem;
