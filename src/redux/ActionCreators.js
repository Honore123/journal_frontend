import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchJournals = (user) => (dispatch) => {
  dispatch(requestJournals());
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "journals/" + user, {
    headers: {
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((journals) => dispatch(addJournals(journals)))
    .catch((error) => dispatch(journalsFailed(error.message)));
};
export const postJournal = (journal) => (dispatch) => {
  dispatch(requestJournals());
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "journals", {
    method: "POST",
    body: JSON.stringify(journal),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((journal) => dispatch(addJournal(journal)))
    .catch((error) => {
      dispatch(journalsFailed(error.message));
      console.log("Post Journal ", error.message);
    });
};
export const putJournal = (id, journal) => (dispatch) => {
  dispatch(requestJournals());
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "journals/" + id, {
    method: "PUT",
    body: JSON.stringify(journal),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((journal) => dispatch(updateJournal(journal)))
    .catch((error) => {
      dispatch(journalsFailed(error.message));
      console.log("Put Journal ", error.message);
    });
};
export const deleteJournal = (id) => (dispatch) => {
  dispatch(requestJournals());
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "journals/" + id, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((journal) => dispatch(removeJournal(journal)))
    .catch((error) => {
      dispatch(journalsFailed(error.message));
      console.log("Delete Journal ", error.message);
    });
};
export const removeJournal = (journal) => ({
  type: ActionTypes.DELETE_JOURNAL,
  payload: journal,
});
export const updateJournal = (journal) => ({
  type: ActionTypes.UPDATE_JOURNAL,
  payload: journal,
});
export const addJournals = (journals) => ({
  type: ActionTypes.ADD_JOURNALS,
  payload: journals,
});
export const addJournal = (journal) => ({
  type: ActionTypes.ADD_JOURNAL,
  payload: journal,
});
export const requestJournals = () => ({
  type: ActionTypes.JOURNALS_REQUEST,
});
export const journalsFailed = (errmess) => ({
  type: ActionTypes.JOURNALS_FAILED,
  payload: errmess,
});

export const registerUser = (user) => (dispatch) => {
  dispatch(requestRegister());
  return fetch(baseUrl + "users/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          if (response.status === 401) {
            var error = new Error("Email is Already registered");
            error.response = response;
            throw error;
          }
          error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((user) => dispatch(receiveRegister(user)))
    .catch((error) => {
      console.log("User Register: ", error.message);
      dispatch(registerFailed(error.message));
    });
};

export const requestRegister = () => ({
  type: ActionTypes.REGISTER_REQUEST,
});
export const receiveRegister = (user) => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload: user,
});
export const registerFailed = (errmess) => ({
  type: ActionTypes.REGISTER_FAILURE,
  payload: errmess,
});

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin());
  return fetch(baseUrl + "users/login", {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.user) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(response.user));
        dispatch(receiveLogin(response));
        dispatch(fetchJournals(response.user.id));
      } else {
        var error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginFailed(error.message)));
};

export const requestLogin = () => ({
  type: ActionTypes.LOGIN_REQUEST,
});
export const receiveLogin = (response) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: response,
});
export const loginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILURE,
  message: errmess,
});

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "users/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: bearer,
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        localStorage.removeItem("token");
        localStorage.removeItem("creds");
        dispatch(receiveLogout());
      }
    })
    .catch((error) => dispatch(logoutFailed(error.message)));
};
export const requestLogout = () => ({
  type: ActionTypes.LOGOUT_REQUEST,
});
export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});
export const logoutFailed = (errmess) => ({
  type: ActionTypes.LOGOUT_FAILURE,
  message: errmess,
});
