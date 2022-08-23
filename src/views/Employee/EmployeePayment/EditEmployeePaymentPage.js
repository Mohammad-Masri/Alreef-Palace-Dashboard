import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MyLoader from 'src/components/MyLoader';
import Page from 'src/components/Page';
import { convertDateToFormatDate } from 'src/helper/moment';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { fetchEmployeePayment, updateEmployeePayment } from 'src/store/EmployeePayment/actions';
import EmployeePaymentForm from './EmployeePaymentForm';

const EditEmployeePaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, employee_payment } = useSelector((state) => state.employee_payment);

  const params = useParams();

  useEffect(() => {
    const { employee_payment_id } = params;
    dispatch(fetchEmployeePayment(employee_payment_id));
  }, [dispatch, params]);

  const initialValues = {
    employee_id: params.employee_id,
    description: employee_payment.description,
    amount: employee_payment.amount,
    employee_payment_type_key: employee_payment?.type?.key,
    date: convertDateToFormatDate(employee_payment.date),
  };

  const onUpdateSuccess = () => {
    navigate(`/dashboard/employee/${params.employee_id}/employee-payment`, { replace: true });
    showSuccessSnackbarMessage('تم تعديل الدفعة بنجاح');
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateEmployeePayment(params.employee_payment_id, values, onUpdateSuccess));
  };

  return (
    <Page title="إنشاء دفعة">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            تعديل الدفعة
          </Typography>
        </Stack>
        {loading ? <MyLoader /> : <EmployeePaymentForm initialValues={initialValues} onSubmit={onSubmit} isEdit />}
      </Container>
    </Page>
  );
};

export default EditEmployeePaymentPage;
