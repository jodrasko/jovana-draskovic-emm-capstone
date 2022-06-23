import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import getFormattedDate from "../../util/helpers";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "./EditMedication.scss";
import { useParams, useHistory } from "react-router-dom";

const EditMedication = () => {
  const params = useParams();
  const { physicianId, medicationId } = params;
  const history = useHistory();
  const [name, setName] = useState("John Doe");
  const [physicians, setPhysicians] = useState([]);
  const [dosage, setDosage] = useState(" ");
  const [refillExpireDate, setRefillExpireDate] = useState(" ");
  const [isLoading, setLoading] = useState(true);
  const [isSavedMedication, setSavedMedication] = useState(false);
  const [isAdd, setAdd] = useState(false);

  const handleClickCancel = (e) => {
    e.preventDefault();
    history.push("/medications");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  parseDate((dateStr) => {
    const arr = dateStr.split("-");

    const d = new Date(
      parseInt(arr[0]),
      parseInt(arr[1]) - 1,
      parseInt(arr[2])
    );
    return d;
  });

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const d = this.parseDate(refillExpireDate);
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    if (isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/medication`;
      axios
        .post(
          url,
          {
            name,
            dosage,
            refillExpireDate: d.getTime(),
            physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedMedication(true);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/medication/${medicationId}`;
      // using input required attributes and built-in browser field validations
      axios
        .put(
          url,
          {
            name,
            dosage,
            refillExpireDate: d.getTime(),
            physicianId,
            profileId: profileId
          },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedMedication(true);
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
        setPhysicians(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect = () => {
    //     // take token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (medicationId) {
      const url = `${process.env.REACT_APP_API_URL}/medication/${medicationId}`;

      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setLoading(false);
          setName(response.data.name),
            setDosage(response.data.dosage),
            setRefillExpireDate(
              getFormattedDate(new Date(response.data.refillExpireDate))
            ),
            setPhysicians(response.data.physicianId);
        })
        .catch((err) => console.log(err));
    } else {
      setAdd(true);
      setLoading(false);
    }

    // Read all physicians
    getAllPhysicians();
  };

  //   componentDidMount() {

  // const { isAdd, isLoading, isSavedMedication } = this.state;

  if (isSavedMedication) {
    return <Redirect to="/medications" />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SidebarAndCard>
      <div className="edit-medication">
        <h1 className="edit-medication__heading">
          {" "}
          {isAdd ? "Add" : "Edit"} Medication
        </h1>
        <Card>
          <div className="edit-medication__message">
            <span>All fields are mandatory.</span>
          </div>
          <form onSubmit={handleSubmit} className="medication-form">
            <div className="medication-form__item">
              <label htmlFor="name" className="medication-form__label">
                Medication:
              </label>
              <input
                type="text"
                className="medication-form__input"
                value={name}
                name="name"
                onChange={handleChange}
                required
              />
              <label htmlFor="dosage" className="medication-form__label">
                Dosage:
              </label>
              <input
                type="text"
                className="medication-form__input"
                value={dosage}
                name="dosage"
                onChange={handleChange}
                required
              />
              <label
                htmlFor="refillExpireDate"
                className="medication-form__label"
              >
                Refill Expiration Date:
              </label>{" "}
              <input
                type="date"
                className="medication-form__input"
                value={refillExpireDate}
                name="refillExpireDate"
                onChange={handleChange}
                required
              />
              <label htmlFor="physicianId" className="medication-form__label">
                Physician:
              </label>{" "}
              <select
                name="physicianId"
                className="medication-form__select-option"
                id="physicianId"
                value={physicianId}
                onChange={handleChange}
                required
              >
                <option value="" className="medication-form__option">
                  Please select
                </option>
                {physicians.map((physician, i) => {
                  return (
                    <option
                      key={i}
                      value={physician.physicianId}
                      className="medication-form__option"
                    >
                      {physician.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="medication-form__action">
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

export default EditMedication;
