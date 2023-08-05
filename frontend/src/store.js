import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeListReducer,
  employeeUpdateReducer,
} from "./reducers/employeesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  employeeList: employeeListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  employeeCreate: employeeCreateReducer,
  employeeDelete: employeeDeleteReducer,
  employeeUpdate: employeeUpdateReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
