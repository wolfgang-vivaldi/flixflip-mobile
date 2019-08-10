import { combineReducers } from "redux";
import movie from "./movie";
import search from "./search";

const app = combineReducers({
  movie,
  search
});

export default app;
