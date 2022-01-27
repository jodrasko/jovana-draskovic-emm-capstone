import axios from "axios";
import { Component } from "react";
import NoteItem from "../../components/NoteItem/NoteItem";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import SidebarAndCard from "../../layouts/SidebarAndCard/SidebarAndCard";
import "../NoteList/NoteList.scss";
import PageTitle from "../../components/PageTitle/PageTitle";

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
      .get(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const filterNote = response.data.filter(
          (note) => note.profileId === profileId
        );
        this.setState({
          isLoading: false,
          notes: filterNote
        });
      })
      .catch((err) => console.log(err));
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push("/add-note");
  };

  componentDidMount() {
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
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_API_URL}/note/${this.state.noteId}`;
    axios
      .delete(url, {
        headers: { authorization: `Bearer ${token}` }
      })
      .then((res) => {
        this.hideModal();
        this.getAllNotes();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <SidebarAndCard>
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
          <PageTitle
            title="Notes"
            type="primary"
            onClick={this.handleClick}
            buttonValue="+ Add"
          />

          <ul className="note-list">
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
      </SidebarAndCard>
    );
  }
}

export default NoteList;
