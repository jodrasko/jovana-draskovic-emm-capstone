import axios from "axios";
import { Component } from "react";
import MedicationItem from "../../components/MedicationItem/MedicationItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import "../MedicationList/MedicationList.scss";
import PageTitle from "../../components/PageTitle/PageTitle";

class MedicationList extends Component {
  state = {
    isLoading: true,
    medications: [],
    showModal: false,
    medicationId: "",
    medicationName: ""
  };

  getAllMedications() {
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    const url = `${process.env.REACT_APP_API_URL}/medication`;

    axios
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response);
        const filterMedication = response.data.filter(
          (medication) => medication.profileId === profileId
        );
        this.setState({
          isLoading: false,
          medications: filterMedication
        });
      })
      .catch((err) => console.log(err));
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/add-medication");
  };

  componentDidMount() {
    this.getAllMedications();
  }

  showModal = (medicationId, medicationName) => {
    this.setState({
      showModal: true,
      medicationId,
      medicationName
    });
  };
  hideModal = () => {
    this.setState({ showModal: false });
  };

  deleteMedication = () => {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/medication/${this.state.medicationId}`;
    axios
      .delete(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        this.hideModal();
        this.getAllMedications();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <SidebarAndCard>
        {this.state.showModal && (
          <DeleteModal
            title={`Delete ${this.state.medicationName} medication?`}
            message={`Please confirm that you'd like to delete ${this.state.medicationName} from the list of medications. You won't be able to undo this action.`}
            onClose={this.hideModal}
            onDelete={this.deleteMedication}
          />
        )}
        <section>
          <PageTitle
            title="Medications"
            type="primary"
            onClick={this.handleClick}
            buttonValue="+ Add"
          />

          <ul className="medication-list">
            {this.state.medications.map((medication) => {
              return (
                <MedicationItem
                  key={medication.medicationId}
                  medication={medication}
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

export default MedicationList;
