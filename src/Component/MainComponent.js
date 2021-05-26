import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Journal from "./JournalComponent";
import CreateAccount from "./CreateAccountComponent";
import Read from "./ReadComponent";
import Edit from "./EditComponent";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchJournals,
  postJournal,
  putJournal,
  deleteJournal,
  registerUser,
  loginUser,
  logoutUser,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    journals: state.journals,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchJournals: () => dispatch(fetchJournals()),
  postJournal: (journal) => dispatch(postJournal(journal)),
  putJournal: (id, journal) => dispatch(putJournal(id, journal)),
  deleteJournal: (id) => dispatch(deleteJournal(id)),
  registerUser: (user) => dispatch(registerUser(user)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});
class Main extends Component {
  componentDidMount() {
    this.props.fetchJournals();
  }
  render() {
    const journal = () => {
      return (
        <Journal
          journals={this.props.journals}
          postJournal={this.props.postJournal}
          deleteJournal={this.props.deleteJournal}
        />
      );
    };
    const ViewJournal = ({ match }) => {
      return (
        <Read
          journal={
            this.props.journals.journals.filter(
              (journal) => journal.id == match.params.id
            )[0]
          }
        />
      );
    };
    const EditJournal = ({ match }) => {
      return (
        <Edit
          journal={
            this.props.journals.journals.filter(
              (journal) => journal.id == match.params.id
            )[0]
          }
          putJournal={this.props.putJournal}
          history={this.props.history}
        />
      );
    };
    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route
            exact
            path="/signup"
            component={() => (
              <CreateAccount registerUser={this.props.registerUser} />
            )}
          />
          <Route exact path="/myjournal" component={journal} />
          <Route exact path="/view/:id" component={ViewJournal} />
          <Route exact path="/edit_note/:id" component={EditJournal} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
