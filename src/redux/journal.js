import * as ActionTypes from "./ActionTypes";

export const Journals = (
  state = {
    isLoading: true,
    errMess: null,
    journals: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_JOURNALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        journals: action.payload,
      };
    case ActionTypes.ADD_JOURNAL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        journals: state.journals.concat(action.payload),
      };
    case ActionTypes.UPDATE_JOURNAL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        journals: state.journals.map((journal) =>
          action.payload.id === journal.id
            ? { journal: action.payload }
            : journal
        ),
      };
    case ActionTypes.DELETE_JOURNAL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        journals: state.journals.filter(
          (journal) => journal.id !== action.payload.id
        ),
      };
    case ActionTypes.JOURNALS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };
    case ActionTypes.JOURNALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
