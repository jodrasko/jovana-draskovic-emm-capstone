import axios from "axios";
import { Component } from "react";
import NoteItem from "../../components/NoteItem/NoteItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";
import "../NoteList/NoteList.scss";

class NoteList extends Component {
  state = {
    isLoading: true,
    notes: [],
    showModal: false,
    noteId: "",
    physicianName: "",
    physicianId: "",
    complaintRemark: "",
    consultRemark: "",
    remark: null
  };

  getAllNotes() {
    const token = sessionStorage.getItem("token");
    const profileId = sessionStorage.getItem("profileId");
    const url = `${process.env.REACT_APP_API_URL}/note`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          notes: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // here grab token from sessionStorage
    this.getAllNotes();
  }

  showModal = (noteId, physicianName, remark) => {
    this.setState({
      showModal: true,
      noteId,
      physicianName,
      remark
    });
  };
  hideModal = () => {
    this.setState({ showModal: false });
  };

  deleteNote = () => {
    const url = `${process.env.REACT_APP_API_URL}/note/${this.state.noteId}`;
    axios
      .delete(url)
      .then((res) => {
        this.hideModal();
        this.getAllNotes();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.showModal && (
          <DeleteModal
            title={`Delete ${this.state.physicianName}'s note?`}
            message={`Please confirm that you'd like to delete ${
              this.state.physicianName
            }'s appointment note${
              this.state.remark &&
              (this.state.remark.consult || this.state.remark.complaint)
                ? ":"
                : "."
            }`}
            postMessage={`You won't be able to undo this action.`}
            remark={this.state.remark}
            onClose={this.hideModal}
            onDelete={this.deleteNote}
          />
        )}
        <section>
          <h1>Note List Page</h1>
          <Link to="/add-note">Add</Link>
          <ul className="next-video__list">
            {this.state.notes.map((note) => {
              return (
                <NoteItem
                  key={note.noteId}
                  note={note}
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

export default NoteList;
