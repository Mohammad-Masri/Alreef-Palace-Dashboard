import { combineReducers } from 'redux';
import employeeReducer from './Employee/reducer';
import employeePaymentReducer from './EmployeePayment/reducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
  employee_payment: employeePaymentReducer,
});

export default rootReducer;
