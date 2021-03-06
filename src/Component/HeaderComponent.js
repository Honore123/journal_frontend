import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavbarToggler,
  Collapse,
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showModal: false,
      dropdownOpen: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  toggleDrop() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  handleLogin(e) {
    e.preventDefault();
    this.props
      .loginUser({
        email: this.email.value,
        password: this.password.value,
      })
      .then(() => {
        this.toggleModal();
      });
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { className } = this.props;
    return (
      <React.Fragment>
        <Navbar color="primary" dark expand="md">
          <div className="container">
            <NavbarBrand>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <h4 className="text-white">Journal</h4>
              </NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={() => this.toggle()} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  {this.props.auth.isAuthenticated &&
                  !this.props.journals.isLoading ? (
                    <NavLink className="nav nav-link" to="/myjournal">
                      My Journal
                    </NavLink>
                  ) : (
                    ""
                  )}
                </NavItem>
              </Nav>
              {!this.props.auth.isAuthenticated ? (
                <Nav navbar className="ms-auto">
                  <NavItem>
                    <NavLink className="nav nav-link" to="/signup">
                      Create account
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <button
                      className="btn btn-outline-info btn-md text-white border-1 rounded-0"
                      onClick={() => this.toggleModal()}
                    >
                      Login
                    </button>
                  </NavItem>
                </Nav>
              ) : (
                <Nav navbar className="ms-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle
                      className="btn btn-outline-info btn-md text-white border-1 rounded-0"
                      nav
                      caret
                    >
                      {this.props.auth.user.fname.substring(0, 1) +
                        ". " +
                        this.props.auth.user.lname}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to='/profile' className="text-dark" style={{textDecoration: 'none'}}>
                          Change Password
                        </Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.handleLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              )}
            </Collapse>
          </div>
        </Navbar>
        <Modal
          isOpen={this.state.showModal}
          toggle={() => this.toggleModal()}
          className={className}
        >
          <ModalBody>
            <div className="container-fluid px-5">
              <div className="row pt-5">
                <div className="col-md-7">
                  <h2 className="text-primary">My Journal</h2>
                </div>
                <div className="col-md-5 d-flex justify-content-end">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => this.toggleModal()}
                  >
                    x
                  </button>
                </div>
                <div className="col-md-12 mt-3">
                  <h4>Login</h4>
                </div>
              </div>
              <div className="row mt-3">
                <Form onSubmit={this.handleLogin}>
                  <FormGroup>
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
                    {this.props.auth.isLoading ? (
                      <Button
                        className="mt-4 mb-5 py-2 w-100"
                        color="primary"
                        disabled
                      >
                        <Spinner size="sm" color="light" children="" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="mt-4 mb-5 py-2 w-100"
                        color="primary"
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
              <p>
                You can create new <NavLink to="/signup">account here!</NavLink>{" "}
              </p>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Header;
