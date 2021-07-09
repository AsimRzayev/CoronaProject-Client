import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { memoriesReducer } from "../modules/Memories/reducer/index";
import { authReducer } from "../modules/Auth/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    memories: memoriesReducer,
    auth: authReducer,
});
const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
