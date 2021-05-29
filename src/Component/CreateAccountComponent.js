import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidError: false,
      success: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    if (
      this.fname.value === "" ||
      this.lname.value === "" ||
      this.email.value === "" ||
      this.password.value === ""
    ) {
      this.setState({ invalidError: true });
      return;
    }
    this.setState({ invalidError: false });
    console.log({
      fname: this.fname.value,
      lname: this.lname.value,
      email: this.email.value,
      password: this.password.value,
    });
    this.props
      .registerUser({
        fname: this.fname.value,
        lname: this.lname.value,
        email: this.email.value,
        password: this.password.value,
      })
      .then(() => {
        if (this.props.auth.errMess) {
          this.setState({ invalidError: true });
          return;
        }
        this.fname.value = "";
        this.lname.value = "";
        this.email.value = "";
        this.password.value = "";
        this.setState({ success: true });
      });
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <Card className="shadow bg-white px-5 py-5 rounded border-0 rounded-0">
              <CardBody>
                <CardTitle tag="h3" className="text-center">
                  Create New Account
                </CardTitle>
                <CardSubtitle
                  tag="h6"
                  className="mb-4 pb-3 text-primary text-center border-bottom border-primary"
                >
                  By filling the form below
                </CardSubtitle>
                <Form onSubmit={this.handleRegister}>
                  <Alert
                    color="danger"
                    isOpen={this.state.invalidError}
                    fade={false}
                  >
                    {this.props.auth.errMess
                      ? this.props.auth.errMess
                      : "Please fill out the form correctly"}
                  </Alert>
                  <Alert
                    color="success"
                    isOpen={this.state.success}
                    fade={false}
                  >
                    Account has been created successfully, You can login!
                  </Alert>
                  <FormGroup className="mt-2">
                    <Label for="exampleFname" className="mb-2">
                      Firstname
                    </Label>
                    <Input
                      className="py-2"
                      type="text"
                      name="fname"
                      id="fname"
                      placeholder="Enter Firstname"
                      innerRef={(input) => (this.fname = input)}
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Label for="examplelname" className="mb-2">
                      Lastname
                    </Label>
                    <Input
                      className="py-2"
                      type="text"
                      name="lname"
                      id="lname"
                      placeholder="Enter Lastname"
                      innerRef={(input) => (this.lname = input)}
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Label for="exampleEmail" className="mb-2">
                      Email
                    </Label>
                    <Input
                      className="py-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      innerRef={(input) => (this.email = input)}
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Label for="examplePassword" className="mb-2">
                      Password
                    </Label>
                    <Input
                      className="py-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      innerRef={(input) => (this.password = input)}
                    />
                  </FormGroup>
                  <div>
                    <Button
                      type="submit"
                      className="mt-5 mb-4 py-2 w-100"
                      color="primary"
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateAccount;
