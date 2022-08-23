import * as actionTypes from './types';

const initState = {
  loading: false,
  employees: [],
  employee: {},
  error: '',
};

const employeeReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EMPLOYEE_REQUEST:
    case actionTypes.UPDATE_EMPLOYEE_REQUEST:
    case actionTypes.DELETE_EMPLOYEE_REQUEST:
    case actionTypes.FETCH_ALL_EMPLOYEES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.CREATE_EMPLOYEE_SUCCESS:
    case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
    case actionTypes.FETCH_ALL_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        loading: false,
        employees: action.payload,
        error: '',
      };
    }
    case actionTypes.CREATE_EMPLOYEE_FAILURE:
    case actionTypes.UPDATE_EMPLOYEE_FAILURE:
    case actionTypes.DELETE_EMPLOYEE_FAILURE:
    case actionTypes.FETCH_ALL_EMPLOYEES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.FETCH_EMPLOYEE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.FETCH_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        loading: false,
        employee: action.payload,
        error: '',
      };
    }

    case actionTypes.FETCH_EMPLOYEE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default employeeReducer;
