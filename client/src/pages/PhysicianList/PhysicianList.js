import axios from "axios";
import { Component } from "react";
import PhysicianItem from "../../components/PhysicianItem/PhysicianItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import { Link } from "react-router-dom";
import "../PhysicianList/PhysicianList.scss";

class PhysicianList extends Component {
  state = {
    isLoading: true,
    physicians: [],
    showModal: false,
    physicianId: "",
    physicianName: ""
  };
  getAllPhysicians() {
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    const url = `${process.env.REACT_APP_API_URL}/physician`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          physicians: response.data
        });
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    // here grab token from sessionStorage
    this.getAllPhysicians();
  }

  showModal = (physicianId, physicianName) => {
    this.setState({
      showModal: true,
      physicianId,
      physicianName
    });
  };
  hideModal = () => {
    this.setState({ showModal: false });
  };

  deletePhysician = () => {
    const url = `${process.env.REACT_APP_API_URL}/physician/${this.state.physicianId}`;
    axios
      .delete(url)
      .then((res) => {
        this.hideModal();
        this.getAllPhysicians();
        // this.hideModal();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <SidebarAndCard>
        {this.state.showModal && (
          <DeleteModal
            title={`Delete ${this.state.physicianName} physician?`}
            message={`Please confirm that you'd like to delete ${this.state.physicianName} from the list of physicians. You won't be able to undo this action.`}
            onClose={this.hideModal}
            onDelete={this.deletePhysician}
          />
        )}
        <section>
          <h1>Physician List Page</h1>
          <Link to="/add-physician">Add</Link>
          <ul className="next-video__list">
            {this.state.physicians.map((physician) => {
              return (
                <PhysicianItem
                  key={physician.physicianId}
                  physician={physician}
                  onClick={this.showModal}
                />
              );
            })}
          </ul>
        </section>
      </SidebarAndCard>
    );
  }
}

export default PhysicianList;
