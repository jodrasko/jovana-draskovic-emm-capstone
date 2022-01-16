import "./SidebarAndCard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

// Card Component
const SidebarAndCard = ({ children }) => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="card-container">{children}</div>;
    </div>
  );
};

export default SidebarAndCard;
