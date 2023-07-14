import * as actionTypes from './types';

const initState = {
  loading: false,
  employees: [],
  employee: {},
  financial_report: {
    employee_payments: [],
    employee_vacations: [],
    employee: {},
    employee_payments_net_account: 0,
    employee_vacations_total_discount: 0,
    net_account: 0,
    from_date: '',
    to_date: '',
  },
  employee_payment: {},
  employee_vacation: {},
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

    case actionTypes.UPDATE_EMPLOYEE_VACATION_REQUEST:
    case actionTypes.CREATE_EMPLOYEE_VACATION_REQUEST:
    case actionTypes.DELETE_EMPLOYEE_VACATION_REQUEST:
    case actionTypes.UPDATE_EMPLOYEE_PAYMENT_REQUEST:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_REQUEST:
    case actionTypes.CREATE_EMPLOYEE_PAYMENT_REQUEST:
    case actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.UPDATE_EMPLOYEE_VACATION_SUCCESS:
    case actionTypes.CREATE_EMPLOYEE_VACATION_SUCCESS:
    case actionTypes.DELETE_EMPLOYEE_VACATION_SUCCESS:
    case actionTypes.UPDATE_EMPLOYEE_PAYMENT_SUCCESS:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_SUCCESS:
    case actionTypes.CREATE_EMPLOYEE_PAYMENT_SUCCESS:
    case actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        financial_report: action.payload,
        error: '',
      };
    }

    case actionTypes.UPDATE_EMPLOYEE_VACATION_FAILURE:
    case actionTypes.CREATE_EMPLOYEE_VACATION_FAILURE:
    case actionTypes.DELETE_EMPLOYEE_VACATION_FAILURE:
    case actionTypes.UPDATE_EMPLOYEE_PAYMENT_FAILURE:
    case actionTypes.DELETE_EMPLOYEE_PAYMENT_FAILURE:
    case actionTypes.CREATE_EMPLOYEE_PAYMENT_FAILURE:
    case actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_FAILURE: {
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

    case actionTypes.FETCH_EMPLOYEE_VACATION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.FETCH_EMPLOYEE_VACATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        employee_vacation: action.payload,
        error: '',
      };
    }

    case actionTypes.FETCH_EMPLOYEE_VACATION_FAILURE: {
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
