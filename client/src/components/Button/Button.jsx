import "../Button/Button.scss";

// Button Component
function Button(props) {
  // The props.type="edit" button is differently implemented.
  // The other buttons are normal HTML buttons.

  function editButton(onClickFn) {
    return (
      <div className="edit-btn-container" onClick={onClickFn}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
            fill="#FFF"
          />
        </svg>
        <span className="edit-btn-container__text">Edit</span>
      </div>
    );
  }

  function deleteButton(onClickFn) {
    return (
      <div className="delete-btn-container" onClick={onClickFn}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
            fill="#C94515"
          />
        </svg>

        <span className="delete-btn-container__text">Delete</span>
      </div>
    );
  }

  function button(p, cssClassName) {
    return (
      <button type="submit" className={cssClassName} onClick={p.onClick}>
        <span>{p.value}</span>
      </button>
    );
  }

  let btnDesign;
  switch (props.type) {
    case "edit":
      btnDesign = editButton(props.onClick);
      break;
    case "icon-delete":
      btnDesign = deleteButton(props.onClick);
      break;
    case "primary":
      btnDesign = button(props, "button__primary");
      break;
    case "secondary":
      btnDesign = button(props, "button__secondary");
      break;
    case "delete":
      btnDesign = button(props, "button__delete");
      break;
    default:
      btnDesign = button(props, "button__primary");
      break;
  }

  return <>{btnDesign}</>;
}

export default Button;
