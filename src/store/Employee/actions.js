/* eslint-disable */
import { convertDateToFormatDate } from 'src/helper/moment';
import { authAxios } from '../../config/axios';
import {
  DELETE_EMPLOYEE_END_POINT,
  FETCH_ALL_EMPLOYEES_END_POINT,
  CREATE_EMPLOYEE_END_POINT,
  FETCH_EMPLOYEE_END_POINT,
  UPDATE_EMPLOYEE_END_POINT,
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
