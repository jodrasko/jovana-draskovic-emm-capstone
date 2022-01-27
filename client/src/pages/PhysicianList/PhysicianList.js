import axios from "axios";
import { Component } from "react";
import PhysicianItem from "../../components/PhysicianItem/PhysicianItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import PageTitle from "../../components/PageTitle/PageTitle";
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
    const url = `${process.env.REACT_APP_API_URL}/physician`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          physicians: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/add-physician");
  };

  componentDidMount() {
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
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/physician/${this.state.physicianId}`;
    axios
      .delete(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        this.hideModal();
        this.getAllPhysicians();
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
          <PageTitle
            title="Physicians"
            type="primary"
            onClick={this.handleClick}
            buttonValue="+ Add"
          />

          <ul className="physician-list">
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
