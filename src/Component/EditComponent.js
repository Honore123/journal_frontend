import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
  Spinner,
  Alert,
} from "reactstrap";

class Edit extends Component {
  constructor(props) {
    super(props);
    const { title, note } = props.journal;
    this.state = {
      showEditModal: true,
      title: title,
      note: note,
      isSubmitting: false,
      invalidError: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, note } = this.state;
    if (title === "" || note === "") {
      this.setState({ invalidError: true });
      return;
    }
    this.setState({ isSubmitting: true, invalidError: false });

    console.log({
      title,
      note,
    });
    this.props
      .putJournal(this.props.journal.id, {
        title,
        note,
      })
      .then(() => {
        this.setState({ isSubmitting: false });
      })
      .then(() => {
        this.props.history.push("/myjournal");
      });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 border-bottom border-primary">
            <h4 className="text-primary"> Modify a Note</h4>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 mt-4 ">
            <Form onSubmit={this.handleSubmit}>
              <Alert
                color="danger"
                isOpen={this.state.invalidError}
                fade={false}
              >
                Please fill out the form correctly
              </Alert>
              <FormGroup>
                <Label className="mb-2">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={this.state.title}
                  placeholder="Enter Note Title"
                  onChange={this.onInputchange}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label className="mb-2">Note</Label>
                <Input
                  type="textarea"
                  id="note"
                  name="note"
                  value={this.state.note}
                  placeholder="Enter Note"
                  onChange={this.onInputchange}
                />
              </FormGroup>
              <div className="container-fluid px-3">
                <div className="row justify-content-between mt-5">
                  <Link
                    className="col-md-3 btn btn-outline-danger rounded-0"
                    to="/myjournal"
                  >
                    Back
                  </Link>
                  {this.state.isSubmitting ? (
                    <Button
                      className="col-md-3 rounded-0"
                      color="primary"
                      outline
                      disabled
                    >
                      <Spinner size="sm" color="primary" children="" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="col-md-3 rounded-0"
                      color="primary"
                      outline
                    >
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default Edit;
