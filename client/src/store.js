import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { movieListReducer } from "./reducers/movieReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  movieList: movieListReducer,
  userLogin: userLoginReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
