import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import getFormattedDate from "../../util/helpers";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./EditNote.scss";
import { useParams, useHistory } from "react-router-dom";

const EditNote = () => {
  const params = useParams();
  const { noteId } = params;
  const history = useHistory();
  const [physicianId, setPhysicianId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("Sept 22, 2022");
  const [physicianList, setPhysicianList] = useState([]);
  const [complaintRemark, setComplaintRemark] = useState();
  const [consultRemark, setConsultRemark] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isSavedNote, setSavedNote] = useState(false);
  const [isAdd, setAdd] = useState(false);

  const handleClickCancel = (e) => {
    e.preventDefault();
    history.push("/notes");
  };

  const handlePhysicianChange = (e) => {
    setPhysicianId(e.target.value);
  };

  const handleAppointmentDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleComplaintChange = (e) => {
    setComplaintRemark(e.target.value);
  };

  const handleConsultChange = (e) => {
    setConsultRemark(e.target.value);
  };

  const parseDate = (dateStr) => {
    const arr = dateStr.split("-");

    const d = new Date(
      parseInt(arr[0]),
      parseInt(arr[1]) - 1,
      parseInt(arr[2])
    );
    return d;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = parseDate(appointmentDate);
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    if (isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/note`;
      axios
        .post(
          url,
          {
            remark: {
              complaint: complaintRemark,
              consult: consultRemark
            },
            date: d.getTime(),
            physicianId: physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedNote(true);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/note/${noteId}`;
      // using input required attributes and built-in browser field validations
      axios
        .put(
          url,
          {
            remark: {
              complaint: complaintRemark,
              consult: consultRemark
            },
            date: d.getTime(),
            physicianId: physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedNote(true);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
    e.target.reset();
  };

  const getAllPhysicians = () => {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/physician`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setLoading(false);
        setPhysicianList(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // take token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (noteId) {
      const url = `${process.env.REACT_APP_API_URL}/note/${noteId}`;

      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setLoading(false);
          setComplaintRemark(response.data.remark.complaintRemark);
          setConsultRemark(response.data.remark.consultRemark);
          setAppointmentDate(getFormattedDate(new Date(response.data.date)));
          setPhysicianId(response.data.physicianId);
        })
        .catch((err) => console.log(err));
    } else {
      setAdd(true);
      setLoading(false);
    }

    // Read all physicians
    getAllPhysicians();
  }, [noteId]);

  if (isSavedNote) {
    return <Redirect to="/notes" />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SidebarAndCard>
      <div className="edit-note">
        <h1 className="edit-note__heading"> {isAdd ? "Add" : "Edit"} Note</h1>
        <Card>
          <div className="edit-note__message">
            <span>All fields are mandatory.</span>
          </div>
          <form onSubmit={handleSubmit} className="note-form">
            <div className="note-form__item">
              <label htmlFor="physicianId" className="note-form__label">
                Physician:
              </label>{" "}
              <select
                name="physicianId"
                className="note-form__select-option"
                id="physicianId"
                value={physicianId}
                onChange={handlePhysicianChange}
                required
              >
                <option value="">Please select</option>
                {physicianList.map((physician, i) => {
                  return (
                    <option key={i} value={physician.physicianId}>
                      {physician.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="appointmentDate" className="note-form__label">
                Appointment Date:
              </label>{" "}
              <input
                type="date"
                className="note-form__input"
                value={appointmentDate}
                name="appointmentDate"
                onChange={handleAppointmentDateChange}
                required
              />
              <label htmlFor="complaintRemark" className="note-form__label">
                Complaint:
              </label>
              <textarea
                className="note-form__input note-form__remark"
                value={complaintRemark}
                name="complaintRemark"
                id="complaintRemark"
                placeholder="Add a complaint note"
                onChange={handleComplaintChange}
              ></textarea>
              <label htmlFor="consultRemark" className="note-form__label">
                Consult:
              </label>
              <textarea
                className="note-form__input note-form__remark"
                value={consultRemark}
                name="consultRemark"
                id="consultRemark"
                placeholder="Add a consult note"
                onChange={handleConsultChange}
              ></textarea>
            </div>

            <div className="note-form__action">
              <Button value="Save" type="primary" />

              <Button
                value="Cancel"
                type="secondary"
                onClick={handleClickCancel}
              />
            </div>
          </form>
        </Card>
      </div>
    </SidebarAndCard>
  );
};

export default EditNote;
