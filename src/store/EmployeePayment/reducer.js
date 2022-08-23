import * as actionTypes from './types';

const initState = {
  loading: false,
  employee_payments: [],
  net_account: 0,
  from_date: '',
  to_date: '',
  employee_payment: {},
  error: '',
};

const employeePaymentReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EMPLOYEE_PAYMENT_REQUEST:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_REQUEST:
    case actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.CREATE_EMPLOYEE_PAYMENT_SUCCESS:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_SUCCESS:
    case actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
        error: '',
      };
    }

    case actionTypes.CREATE_EMPLOYEE_PAYMENT_FAILURE:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_FAILURE:
    case actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.FETCH_EMPLOYEE_PAYMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_EMPLOYEE_PAYMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        employee_payment: action.payload,
        error: '',
      };
    }
    case actionTypes.FETCH_EMPLOYEE_PAYMENT_FAILURE: {
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

export default employeePaymentReducer;
