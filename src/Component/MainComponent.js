import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Journal from "./JournalComponent";
import CreateAccount from "./CreateAccountComponent";
import Read from "./ReadComponent";
import Edit from "./EditComponent";
import Loading from "./LoadingComponent";
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
import { Spinner } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    journals: state.journals,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchJournals: (userId) => dispatch(fetchJournals(userId)),
  postJournal: (journal) => dispatch(postJournal(journal)),
  putJournal: (id, journal) => dispatch(putJournal(id, journal)),
  deleteJournal: (id) => dispatch(deleteJournal(id)),
  registerUser: (user) => dispatch(registerUser(user)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});
class Main extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchJournals(this.props.auth.user.id);
    }
  }
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    const ViewJournal = ({ match }) => {
      return this.props.journals.journals ? (
        <Read
          journal={
            this.props.journals.journals.filter(
              (journal) => journal.id == match.params.id
            )[0]
          }
        />
      ) : (
        <Loading />
      );
    };
    const EditJournal = ({ match }) => {
      return this.props.journals.journals ? (
        <Edit
          journal={
            this.props.journals.journals.filter(
              (journal) => journal.id == match.params.id
            )[0]
          }
          putJournal={this.props.putJournal}
          postJournal={this.props.postJournal}
          history={this.props.history}
        />
      ) : (
        <Loading />
      );
    };
    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          journals={this.props.journals}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home auth={this.props.auth} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              this.props.auth.isAuthenticated ? (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location },
                  }}
                />
              ) : (
                <CreateAccount
                  auth={this.props.auth}
                  registerUser={this.props.registerUser}
                />
              )
            }
          />
          <PrivateRoute
            exact
            path="/myjournal"
            component={() => (
              <Journal
                journals={this.props.journals}
                postJournal={this.props.postJournal}
                deleteJournal={this.props.deleteJournal}
                fetchJournals={this.props.fetchJournals}
              />
            )}
          />
          <PrivateRoute exact path="/view/:id" component={ViewJournal} />
          <PrivateRoute exact path="/edit_note/:id" component={EditJournal} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
