import { combineReducers } from 'redux';
import employeeReducer from './Employee/reducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export default rootReducer;
