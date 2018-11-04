import { combineReducers} from "redux";
import bridge from "./bridge";
import { ApplicationState } from "./";

const rootReducer = combineReducers<ApplicationState>({ bridge });
export default rootReducer;