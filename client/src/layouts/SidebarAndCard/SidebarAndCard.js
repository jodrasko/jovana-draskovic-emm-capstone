import "./SidebarAndCard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
// import { Component } from "react";

// Card Component
const SidebarAndCard = ({ children }) => {
  const isMobile = () =>
    window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
  console.log("isMobile=", isMobile());

  function handleClick() {
    console.log("handleClick isMobile=", isMobile());
  }

  return (
    <div className="page-container">
      <div className="page-sidebar">
        <Sidebar />
      </div>
      <div className="page-card">{children}</div>
    </div>
  );
};

export default SidebarAndCard;

{
  /* <div className="container">
<div className="left-box">
  <Sidebar />
</div>

<div className="right-box"> */
}
// class SidebarAndCard extends Component {
//   render() {
//     return (
//       <div className="page-container">
//         <div className="show-for-desktop">

//         <Sidebar />
//         </div>
//         <div className="hide-for-mobile">{children}</div>;
//       </div>
//     );
//   }
// }

// export default SidebarAndCard;
