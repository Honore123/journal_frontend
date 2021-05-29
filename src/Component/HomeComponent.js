import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-4">Welcome to Journal</h1>
            <h5 className="text-muted">
              Write down what's on your mind, and review all your thoughts in a
              single click wherever you are
            </h5>
            {this.props.auth.isAuthenticated ? (
              <NavLink
                to="/myjournal"
                className="mt-4 btn btn-outline-warning btn-lg"
              >
                My Journal
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                className="mt-4 btn btn-outline-warning btn-lg"
              >
                Get Started
              </NavLink>
            )}
          </div>
          <div className="col-md-6">
            <img src="/assets/image/jumb.jpg" width="100%" alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
