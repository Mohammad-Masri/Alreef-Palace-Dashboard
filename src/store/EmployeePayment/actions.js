/* eslint-disable */
import { authAxios } from '../../config/axios';
import {
  CREATE_EMPLOYEE_PAYMENT_END_POINT,
  DELETE_EMPLOYEE_PAYMENT_END_POINT,
  FETCH_ALL_EMPLOYEE_PAYMENT_END_POINT,
  FETCH_EMPLOYEE_PAYMENT_END_POINT,
  UPDATE_EMPLOYEE_PAYMENT_END_POINT,
} from '../../server/end-points';
import * as actionTypes from './types';

export const fetchEmployeePaymentsRequest = () => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_REQUEST,
  };
};
export const fetchEmployeePaymentsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_SUCCESS,
    payload: data,
  };
};
export const fetchEmployeePaymentsFailure = (error) => {
  return {
    type: actionTypes.FETCH_ALL_EMPLOYEE_PAYMENTS_FAILURE,
    payload: error,
  };
};

export const fetchEmployeePayments = (employee_id, from_date, to_date) => {
  return (dispatch) => {
    dispatch(fetchEmployeePaymentsRequest());
    authAxios
      .get(`${FETCH_ALL_EMPLOYEE_PAYMENT_END_POINT}${employee_id}?from_date=${from_date}&to_date=${to_date}`)
      .then((res) => {
        const data = res.data;

        console.log('datadatadatadata\n', data);

        dispatch(fetchEmployeePaymentsSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchEmployeePaymentsFailure(error));
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

export const deleteEmployeePayment = (employee_payment_id, from_date, to_date) => {
  return (dispatch) => {
    dispatch(deleteEmployeePaymentRequest());
    authAxios
      .delete(`${DELETE_EMPLOYEE_PAYMENT_END_POINT}${employee_payment_id}?from_date=${from_date}&to_date=${to_date}`)
      .then((res) => {
        const data = res.data;

        dispatch(deleteEmployeePaymentSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteEmployeePaymentFailure(error));
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

export const updateEmployeePayment = (employee_payment_id, body, onUpdateSuccess) => {
  return (dispatch) => {
    dispatch(updateEmployeePaymentRequest());
    authAxios
      .put(`${UPDATE_EMPLOYEE_PAYMENT_END_POINT}${employee_payment_id}`, body)
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
