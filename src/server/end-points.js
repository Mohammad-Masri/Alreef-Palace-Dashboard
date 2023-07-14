/* eslint-disable */
const REACT_APP_ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
const REACT_APP_PROTOCOL = process.env.REACT_APP_PROTOCOL;
const REACT_APP_HOST = process.env.REACT_APP_HOST;
const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT;

const DEV_API_URL = `${REACT_APP_PROTOCOL}://${REACT_APP_HOST}:${REACT_APP_SERVER_PORT}`;
const NOT_DEV_API_URL = `${REACT_APP_PROTOCOL}://${REACT_APP_HOST}`;

export const SERVER_BASE_URL = REACT_APP_ENVIRONMENT == 'dev' ? DEV_API_URL : NOT_DEV_API_URL;

console.log('SERVER_BASE_URL : ', SERVER_BASE_URL);

// Auth
export const LOGIN_END_POINT = `${SERVER_BASE_URL}/api/v1/authentication/login`;
export const LOGOUT_END_POINT = `${SERVER_BASE_URL}/api/v1/authentication/logout`;
export const CHECK_AUTH_END_POINT = `${SERVER_BASE_URL}/api/v1/authentication/check-auth`;

// Employee
export const FETCH_ALL_EMPLOYEES_END_POINT = `${SERVER_BASE_URL}/api/v1/employee`;
export const DELETE_EMPLOYEE_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/`;
export const CREATE_EMPLOYEE_END_POINT = `${SERVER_BASE_URL}/api/v1/employee`;
export const FETCH_EMPLOYEE_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/`;
export const UPDATE_EMPLOYEE_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/`;

export const FETCH_EMPLOYEE_FINANCIAL_REPORT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/financial-report/`;

// Employee Payment
export const FETCH_ALL_EMPLOYEE_PAYMENT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-payment/get-all/`;
export const DELETE_EMPLOYEE_PAYMENT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-payment/`;
export const CREATE_EMPLOYEE_PAYMENT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-payment`;
export const FETCH_EMPLOYEE_PAYMENT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-payment/`;
export const UPDATE_EMPLOYEE_PAYMENT_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-payment/`;

// Employee Vacation
export const FETCH_ALL_EMPLOYEE_VACATION_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-vacation/get-all/`;
export const DELETE_EMPLOYEE_VACATION_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-vacation/`;
export const CREATE_EMPLOYEE_VACATION_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-vacation`;
export const FETCH_EMPLOYEE_VACATION_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-vacation/`;
export const UPDATE_EMPLOYEE_VACATION_END_POINT = `${SERVER_BASE_URL}/api/v1/employee/employee-vacation/`;
