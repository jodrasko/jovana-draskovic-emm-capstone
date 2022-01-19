import axios from "axios";
import { Component } from "react";
import MedicationItem from "../../components/MedicationItem/MedicationItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";
import "../MedicationList/MedicationList.scss";

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
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          medications: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // here grab token from sessionStorage
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
    const url = `${process.env.REACT_APP_API_URL}/medication/${this.state.medicationId}`;
    axios
      .delete(url)
      .then((res) => {
        this.hideModal();
        this.getAllMedications();
        // this.hideModal();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.showModal && (
          <DeleteModal
            title={`Delete ${this.state.medicationName} medication?`}
            message={`Please confirm that you'd like to delete ${this.state.medicationName} from the list of medications. You won't be able to undo this action.`}
            onClose={this.hideModal}
            onDelete={this.deleteMedication}
          />
        )}
        <section>
          <h1>Medication List Page</h1>
          <Link to="/add-medication">Add</Link>
          <ul className="next-video__list">
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
      </>
    );
  }
}

export default MedicationList;
