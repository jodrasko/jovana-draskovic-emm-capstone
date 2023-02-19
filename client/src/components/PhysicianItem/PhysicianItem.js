import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "../PhysicianItem/PhysicianItem.scss";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";

const PhysicianItem = (props) => {
  return (
    <>
      <Card>
        <div className="physician-item">
          <h3 className="physician-item__heading">{props.physician.name}</h3>
          <p>{props.physician.specialty}</p>
          <p>{props.physician.phone}</p>
        </div>
        <div className="physician-action">
          <Link
            to={`/edit-physician/${props.physician.physicianId}`}
            className="physician-action__link"
          >
            <img src={editIcon} alt="edit icon" />
          </Link>
          <img
            src={deleteIcon}
            alt="delete icon"
            onClick={() =>
              props.onClick(props.physician.physicianId, props.physician.name)
            }
          />
        </div>
      </Card>
    </>
  );
};

export default PhysicianItem;
