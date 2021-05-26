import React, { Component } from "react";
import { Link } from "react-router-dom";
class Read extends Component {
  render() {
    const { title, note } = this.props.journal;
    return (
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 mt-4 d-flex justify-content-end">
            <Link className="btn btn-outline-primary rounded-0" to="/myjournal">
              Back
            </Link>
          </div>
          <div className="col-md-8 mt-3">
            <h2>{title}</h2>
          </div>
          <div className="col-md-8">
            <p className="text-justified">{note}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Read;
