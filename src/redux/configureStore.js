import { createStore, combineReducers, applyMiddleware } from "redux";
import { Journals } from "./journal";
import { Auth } from "./auth";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      journals: Journals,
      auth: Auth,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
