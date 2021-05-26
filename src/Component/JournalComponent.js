import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardGroup,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import { fetchJournals } from "../redux/ActionCreators";
const mapStateToProps = (state) => {
  return {
    journals: state.journals,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchJournals: () => dispatch(fetchJournals()),
});
class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showDrop: false,
      showEditModal: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  toggleDrop = () => {
    this.setState({ showDrop: !this.state.showDrop });
  };
  handleDelete(id) {
    this.props.deleteJournal(id);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.toggleModal();
    const userId = 1;
    console.log({
      title: this.title.value,
      note: this.note.value,
      user_id: userId,
    });
    this.props.postJournal({
      title: this.title.value,
      note: this.note.value,
      user_id: userId,
    });
  }

  render() {
    const { buttonLabel, className } = this.props;
    const closeBtn = (
      <button
        className="btn btn-outline-primary rounded-1"
        onClick={this.toggleModal}
      >
        &times;
      </button>
    );
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 border-bottom border-primary">
            <h4 className="text-primary"> My Journal</h4>
          </div>
          <div className="col-md-12 mt-4 mb-1 d-flex justify-content-end">
            <button
              className="btn btn-outline-primary ms-auto rounded-0"
              onClick={this.toggleModal}
            >
              New Daily
            </button>
            <Modal
              isOpen={this.state.showModal}
              toggle={this.toggleModal}
              className={className}
            >
              <ModalHeader
                className="text-primary px-5 pt-5 border-0"
                toggle={this.toggleModal}
                close={closeBtn}
              >
                Write a Note
              </ModalHeader>
              <Form onSubmit={this.handleSubmit}>
                <ModalBody className="px-5">
                  <FormGroup>
                    <Label className="mb-2">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter Note Title"
                      innerRef={(input) => (this.title = input)}
                    />
                  </FormGroup>
                  <FormGroup className="mt-3">
                    <Label className="mb-2">Note</Label>
                    <Input
                      type="textarea"
                      id="note"
                      name="note"
                      placeholder="Enter Note"
                      innerRef={(input) => (this.note = input)}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter className="border-0 px-5 pb-5">
                  <Button
                    className="rounded-0"
                    color="danger"
                    outline
                    onClick={this.toggleModal}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    type="submit"
                    className="ms-auto rounded-0"
                    color="primary"
                    outline
                  >
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="row">
          {this.props.journals.journals.map((journal, index) => (
            <div key={index} className="col-sm-4 mt-3">
              <Card className="shadow-sm border-0" body>
                <Link
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                  to={`/view/${journal.id}`}
                >
                  <CardTitle tag="h5">{journal.title}</CardTitle>
                  <CardText>{journal.note.substring(0, 60)}...</CardText>
                </Link>
                <div className="row justify-content-between mt-3">
                  <Link
                    className="col-md-4 btn btn-outline-primary rounded-0"
                    to={`/edit_note/${journal.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    className="col-md-4 rounded-0"
                    color="danger"
                    outline
                    onClick={() => this.handleDelete(journal.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Journal);
