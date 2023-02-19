import React from "react";
import close from "../../assets/images/Icons/close-24px.svg";
import "./DeleteModal.scss";
import PropTypes from "prop-types";
import Button from "../Button/Button";

const DeleteModal = (props) => {
  const truncateText = (s) => {
    const maxLength = 100;
    let result = "";
    if (s.length > maxLength) {
      result = s.substring(0, maxLength) + "...";
    } else {
      result = s;
    }
    return result;
  };

  return (
    <div className="backdrop">
      <section className="modal">
        <img
          onClick={props.onClose}
          className="modal__image"
          src={close}
          alt="close"
        />
        <h1 className="modal__title">{props.title}</h1>
        <p className="modal__message">{props.message}</p>
        {props.remark && (
          <div>
            {props.remark.consult && (
              <>
                <h3>Consult:</h3>
                <p className="modal__message">
                  {truncateText(props.remark.consult)}
                </p>
              </>
            )}
            {props.remark.complaint && (
              <>
                <h3>Complaint:</h3>
                <p className="modal__message">
                  {truncateText(props.remark.complaint)}
                </p>
              </>
            )}
          </div>
        )}

        {props.postMessage && (
          <p className="modal__post-message">{props.postMessage}</p>
        )}

        <div className="modal__footer">
          <Button value="Cancel" type="secondary" onClick={props.onClose} />
          <Button value="Delete" type="delete" onClick={props.onDelete} />
        </div>
      </section>
    </div>
  );
};

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DeleteModal;
