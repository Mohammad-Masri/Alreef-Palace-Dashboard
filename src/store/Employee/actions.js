/* eslint-disable */
import { authAxios } from '../../config/axios';
import {
  DELETE_EMPLOYEE_END_POINT,
  FETCH_ALL_EMPLOYEES_END_POINT,
  CREATE_EMPLOYEE_END_POINT,
  FETCH_EMPLOYEE_END_POINT,
  UPDATE_EMPLOYEE_END_POINT,
  FETCH_EMPLOYEE_FINANCIAL_REPORT_END_POINT,
  CREATE_EMPLOYEE_PAYMENT_END_POINT,
  DELETE_EMPLOYEE_PAYMENT_END_POINT,
  FETCH_EMPLOYEE_PAYMENT_END_POINT,
  UPDATE_EMPLOYEE_PAYMENT_END_POINT,
  DELETE_EMPLOYEE_VACATION_END_POINT,
  CREATE_EMPLOYEE_VACATION_END_POINT,
  FETCH_EMPLOYEE_VACATION_END_POINT,
  UPDATE_EMPLOYEE_VACATION_END_POINT,
} from '../../server/end-points';
import * as actionTypes from './types';

export const fetchEmployeesRequest = () => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEES_REQUEST,
  };
};
export const fetchEmployeesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEES_SUCCESS,
    payload: data,
  };
};
export const fetchEmployeesFailure = (error) => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEES_FAILURE,
    payload: error,
  };
};

export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesRequest());
    authAxios
      .get(FETCH_ALL_EMPLOYEES_END_POINT)
      .then((res) => {
        const data = res.data;

        dispatch(fetchEmployeesSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchEmployeesFailure(error));
      });
  };
};

export const deleteEmployeeRequest = () => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_REQUEST,
  };
};
export const deleteEmployeeSuccess = (data) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const deleteEmployeeFailure = (error) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const deleteEmployee = (employee_id, onDeleteSuccess) => {
  return (dispatch) => {
    dispatch(deleteEmployeeRequest());
    authAxios
      .delete(`${DELETE_EMPLOYEE_END_POINT}${employee_id}`)
      .then((res) => {
        const data = res.data;

        dispatch(deleteEmployeeSuccess(data));
        onDeleteSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteEmployeeFailure(error));
      });
  };
};

export const createEmployeeRequest = () => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_REQUEST,
  };
};
export const createEmployeeSuccess = (data) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const createEmployeeFailure = (error) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const createEmployee = (body, onCreateSuccess) => {
  return (dispatch) => {
    dispatch(createEmployeeRequest());
    authAxios
      .post(CREATE_EMPLOYEE_END_POINT, body)
      .then((res) => {
        const data = res.data;

        dispatch(createEmployeeSuccess(data));
        onCreateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(createEmployeeFailure(error));
      });
  };
};

export const fetchOneEmployeeRequest = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_REQUEST,
  };
};
export const fetchOneEmployeeSuccess = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const fetchOneEmployeeFailure = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const fetchOneEmployee = (employee_id) => {
  return (dispatch) => {
    dispatch(fetchOneEmployeeRequest());
    authAxios
      .get(FETCH_EMPLOYEE_END_POINT + employee_id)
      .then((res) => {
        const data = res.data;

        dispatch(fetchOneEmployeeSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchOneEmployeeFailure(error));
      });
  };
};

export const updateOneEmployeeRequest = () => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_REQUEST,
  };
};
export const updateOneEmployeeSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
export const updateOneEmployeeFailure = (error) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const updateOneEmployee = (employee_id, body, onUpdateSuccess) => {
  return (dispatch) => {
    dispatch(updateOneEmployeeRequest());
    authAxios
      .put(UPDATE_EMPLOYEE_END_POINT + employee_id, body)
      .then((res) => {
        const data = res.data;
        dispatch(updateOneEmployeeSuccess(data));
        onUpdateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateOneEmployeeFailure(error));
      });
  };
};

export const fetchEmployeeFinancialReportRequest = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_REQUEST,
  };
};
export const fetchEmployeeFinancialReportSuccess = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_SUCCESS,
    payload: data,
  };
};
export const fetchEmployeeFinancialReportFailure = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_FINANCIAL_REPORT_FAILURE,
    payload: error,
  };
};

export const fetchEmployeeFinancialReport = (employee_id, from_date, to_date) => {
  return (dispatch) => {
    dispatch(fetchEmployeeFinancialReportRequest());
    authAxios
      .get(`${FETCH_EMPLOYEE_FINANCIAL_REPORT_END_POINT}${employee_id}?from_date=${from_date}&to_date=${to_date}`)
      .then((res) => {
        const data = res.data;

        dispatch(fetchEmployeeFinancialReportSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchEmployeeFinancialReportFailure(error));
      });
  };
};

export const createEmployeePaymentRequest = () => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_PAYMENT_REQUEST,
  };
};
export const createEmployeePaymentSuccess = (data) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_PAYMENT_SUCCESS,
    payload: data,
  };
};
export const createEmployeePaymentFailure = (error) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_PAYMENT_FAILURE,
    payload: error,
  };
};

export const createEmployeePayment = (body, from_date, to_date, onCreateSuccess) => {
  return (dispatch) => {
    dispatch(createEmployeePaymentRequest());
    authAxios
      .post(`${CREATE_EMPLOYEE_PAYMENT_END_POINT}?from_date=${from_date}&to_date=${to_date}`, body)
      .then((res) => {
        const data = res.data;

        dispatch(createEmployeePaymentSuccess(data));
        onCreateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(createEmployeePaymentFailure(error));
      });
  };
};

export const deleteEmployeePaymentRequest = () => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_PAYMENT_REQUEST,
  };
};
export const deleteEmployeePaymentSuccess = (data) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_PAYMENT_SUCCESS,
    payload: data,
  };
};
export const deleteEmployeePaymentFailure = (error) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_PAYMENT_FAILURE,
    payload: error,
  };
};

export const deleteEmployeePayment = (employee_payment_id, from_date, to_date, onDeleteSuccess) => {
  return (dispatch) => {
    dispatch(deleteEmployeePaymentRequest());
    authAxios
      .delete(`${DELETE_EMPLOYEE_PAYMENT_END_POINT}${employee_payment_id}?from_date=${from_date}&to_date=${to_date}`)
      .then((res) => {
        const data = res.data;

        dispatch(deleteEmployeePaymentSuccess(data));
        onDeleteSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteEmployeePaymentFailure(error));
      });
  };
};

export const fetchEmployeePaymentRequest = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_PAYMENT_REQUEST,
  };
};
export const fetchEmployeePaymentSuccess = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_PAYMENT_SUCCESS,
    payload: data,
  };
};
export const fetchEmployeePaymentFailure = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_PAYMENT_FAILURE,
    payload: error,
  };
};

export const fetchEmployeePayment = (employee_payment_id) => {
  return (dispatch) => {
    dispatch(fetchEmployeePaymentRequest());
    authAxios
      .get(`${FETCH_EMPLOYEE_PAYMENT_END_POINT}${employee_payment_id}`)
      .then((res) => {
        const data = res.data;

        dispatch(fetchEmployeePaymentSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchEmployeePaymentFailure(error));
      });
  };
};

export const updateEmployeePaymentRequest = () => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_PAYMENT_REQUEST,
  };
};
export const updateEmployeePaymentSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_PAYMENT_SUCCESS,
    payload: data,
  };
};
export const updateEmployeePaymentFailure = (error) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_PAYMENT_FAILURE,
    payload: error,
  };
};

export const updateEmployeePayment = (employee_payment_id, body, from_date, to_date, onUpdateSuccess) => {
  return (dispatch) => {
    dispatch(updateEmployeePaymentRequest());
    authAxios
      .put(`${UPDATE_EMPLOYEE_PAYMENT_END_POINT}${employee_payment_id}?from_date=${from_date}&to_date=${to_date}`, body)
      .then((res) => {
        const data = res.data;

        dispatch(updateEmployeePaymentSuccess(data));
        onUpdateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateEmployeePaymentFailure(error));
      });
  };
};

// // Employee Vacation
export const createEmployeeVacationRequest = () => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_VACATION_REQUEST,
  };
};
export const createEmployeeVacationSuccess = (data) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_VACATION_SUCCESS,
    payload: data,
  };
};
export const createEmployeeVacationFailure = (error) => {
  return {
    type: actionTypes.CREATE_EMPLOYEE_VACATION_FAILURE,
    payload: error,
  };
};

export const createEmployeeVacation = (body, from_date, to_date, onCreateSuccess) => {
  return (dispatch) => {
    dispatch(createEmployeeVacationRequest());
    authAxios
      .post(`${CREATE_EMPLOYEE_VACATION_END_POINT}?from_date=${from_date}&to_date=${to_date}`, body)
      .then((res) => {
        const data = res.data;

        dispatch(createEmployeeVacationSuccess(data));
        onCreateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(createEmployeeVacationFailure(error));
      });
  };
};

export const deleteEmployeeVacationRequest = () => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_VACATION_REQUEST,
  };
};
export const deleteEmployeeVacationSuccess = (data) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_VACATION_SUCCESS,
    payload: data,
  };
};
export const deleteEmployeeVacationFailure = (error) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_VACATION_FAILURE,
    payload: error,
  };
};

export const deleteEmployeeVacation = (employee_vacation_id, from_date, to_date, onDeleteSuccess) => {
  return (dispatch) => {
    dispatch(deleteEmployeeVacationRequest());
    authAxios
      .delete(`${DELETE_EMPLOYEE_VACATION_END_POINT}${employee_vacation_id}?from_date=${from_date}&to_date=${to_date}`)
      .then((res) => {
        const data = res.data;

        dispatch(deleteEmployeeVacationSuccess(data));
        onDeleteSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteEmployeeVacationFailure(error));
      });
  };
};

export const fetchEmployeeVacationRequest = () => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_VACATION_REQUEST,
  };
};
export const fetchEmployeeVacationSuccess = (data) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_VACATION_SUCCESS,
    payload: data,
  };
};
export const fetchEmployeeVacationFailure = (error) => {
  return {
    type: actionTypes.FETCH_EMPLOYEE_VACATION_FAILURE,
    payload: error,
  };
};

export const fetchEmployeeVacation = (employee_vacation_id) => {
  return (dispatch) => {
    dispatch(fetchEmployeeVacationRequest());
    authAxios
      .get(`${FETCH_EMPLOYEE_VACATION_END_POINT}${employee_vacation_id}`)
      .then((res) => {
        const data = res.data;

        dispatch(fetchEmployeeVacationSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchEmployeeVacationFailure(error));
      });
  };
};

export const updateEmployeeVacationRequest = () => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_VACATION_REQUEST,
  };
};
export const updateEmployeeVacationSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_VACATION_SUCCESS,
    payload: data,
  };
};
export const updateEmployeeVacationFailure = (error) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_VACATION_FAILURE,
    payload: error,
  };
};

export const updateEmployeeVacation = (employee_vacation_id, body, from_date, to_date, onUpdateSuccess) => {
  return (dispatch) => {
    dispatch(updateEmployeeVacationRequest());
    authAxios
      .put(
        `${UPDATE_EMPLOYEE_VACATION_END_POINT}${employee_vacation_id}?from_date=${from_date}&to_date=${to_date}`,
        body
      )
      .then((res) => {
        const data = res.data;

        dispatch(updateEmployeeVacationSuccess(data));
        onUpdateSuccess();
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateEmployeeVacationFailure(error));
      });
  };
};
