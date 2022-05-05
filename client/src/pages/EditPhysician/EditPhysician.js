import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import "./EditPhysician.scss";
import { useParams, useHistory } from "react-router-dom";

function EditPhysician() {
  const params = useParams();
  const { physicianId } = params;
  const history = useHistory();
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("6041111112");
  const [specialty, setSpecialty] = useState("Neurology");
  const [isLoading, setLoading] = useState(true);
  const [isSavedPhysician, setSavedPhysician] = useState(false);
  const [isAdd, setAdd] = useState(false);

  function handleClickCancel(e) {
    e.preventDefault();
    history.push("/physicians");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  // submit form
  function handleSubmit(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (isAdd) {
      const url = `${process.env.REACT_APP_API_URL}/physician`;
      axios
        .post(
          url,
          { name, phone, specialty },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedPhysician(true);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/physician/${physicianId}`;
      // using input required attributes and built-in browser field validations
      axios
        .put(
          url,
          { name, phone, specialty },
          {
            headers: { authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setSavedPhysician(true);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
    e.target.reset();
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (physicianId) {
      const url = `${process.env.REACT_APP_API_URL}/physician/${physicianId}`;

      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setLoading(false);
          setName(response.data.name);
          setPhone(response.data.phone);
          setSpecialty(response.data.specialty);
        })
        .catch((err) => console.log(err));
    } else {
      setAdd(true);
      setLoading(false);
    }
  });

  if (isSavedPhysician) {
    return <Redirect to="/physicians" />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SidebarAndCard>
      <div className="edit-physician">
        <h1 className="edit-physician__heading">
          {" "}
          {isAdd ? "Add" : "Edit"} Physician
        </h1>
        <Card>
          <div className="edit-physician__message">
            <span>All fields are mandatory.</span>
          </div>
          <form onSubmit={handleSubmit} className="physician-form">
            <div className="physician-form__item">
              <label htmlFor="name" className="physician-form__label">
                Name:
              </label>
              <input
                type="text"
                className="physician-form__input"
                value={name}
                name="name"
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className="physician-form__label">
                Phone Number:
              </label>
              <input
                type="text"
                className="physician-form__input"
                value={phone}
                name="phone"
                onChange={handleChange}
                required
              />
              <label htmlFor="specialty" className="physician-form__label">
                Specialty:
              </label>{" "}
              <input
                type="text"
                className="physician-form__input"
                value={specialty}
                name="specialty"
                onChange={handleChange}
                required
              />
            </div>

            <div className="physician-form__action">
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
}

export default EditPhysician;
