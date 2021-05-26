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
} from "reactstrap";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: true,
      title: "",
      note: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }
  componentDidMount() {
    const { title, note } = this.props.journal;
    this.setState({ title, note });
    console.log(this.props);
  }
  componentWillUnmount() {
    console.log("Component unmounted that's error");
  }
  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, note } = this.state;
    const userId = 1;
    console.log({
      title: title,
      note: note,
      user_id: userId,
    });
    this.props.putJournal(this.props.journal.id, {
      title: title,
      note: note,
      user_id: userId,
    });
    this.props.history.push("/");
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
                  </Link>{" "}
                  <Button
                    type="submit"
                    className="col-md-3 rounded-0"
                    color="primary"
                    outline
                  >
                    Save
                  </Button>
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
