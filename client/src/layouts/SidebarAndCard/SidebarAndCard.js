import "./SidebarAndCard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Sidebar And Card Layout - Structure of Full Website
const SidebarAndCard = ({ children }) => {
  return (
    <div className="page-container">
      <Header />
      <div className="page-middle">
        <Sidebar />
        <div className="page-card">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default SidebarAndCard;
