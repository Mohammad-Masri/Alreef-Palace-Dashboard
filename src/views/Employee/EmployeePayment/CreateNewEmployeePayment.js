import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { STATIC_DATA } from 'src/server/static-data';
import { createEmployeePayment } from 'src/store/Employee/actions';
import EmployeePaymentForm from './EmployeePaymentForm';

const CreateNewEmployeePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { from_date, to_date } = useSelector((state) => state.employee.financial_report);

  const params = useParams();

  const initialValues = {
    employee_id: params.employee_id,
    description: '',
    amount: '',
    employee_payment_type_key: STATIC_DATA.EMPLOYEE_PAYMENT_TYPES.SALARY,
    date: '',
  };

  const onCreateSuccess = () => {
    navigate(`/dashboard/employee/${params.employee_id}/financial-report`, { replace: true });
    showSuccessSnackbarMessage('تم إنشاء الدفعة بنجاح');
  };

  const onSubmit = (values) => {
    dispatch(createEmployeePayment(values, from_date, to_date, onCreateSuccess));
  };

  return (
    <Page title="إنشاء دفعة">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            إنشاء دفعة جديدة
          </Typography>
        </Stack>
        <EmployeePaymentForm initialValues={initialValues} onSubmit={onSubmit} />
      </Container>
    </Page>
  );
};

export default CreateNewEmployeePayment;
