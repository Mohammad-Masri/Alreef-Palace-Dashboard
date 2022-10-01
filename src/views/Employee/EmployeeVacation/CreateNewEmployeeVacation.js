import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { STATIC_DATA } from 'src/server/static-data';
import { createEmployeeVacation } from 'src/store/Employee/actions';
import EmployeeVacationForm from './EmployeeVacationForm';

const CreateNewEmployeeVacation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { from_date, to_date } = useSelector((state) => state.employee.financial_report);

  const params = useParams();

  const initialValues = {
    employee_id: params.employee_id,
    reason: '',
    discount_value: 0,
    date: '',
  };

  const onCreateSuccess = () => {
    navigate(`/dashboard/employee/${params.employee_id}/financial-report`, { replace: true });
    showSuccessSnackbarMessage('تم إنشاء الإجازة بنجاح');
  };

  const onSubmit = (values) => {
    dispatch(createEmployeeVacation(values, from_date, to_date, onCreateSuccess));
  };

  return (
    <Page title="إنشاء إجازة">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            إنشاء إجازة جديدة
          </Typography>
        </Stack>
        <EmployeeVacationForm initialValues={initialValues} onSubmit={onSubmit} />
      </Container>
    </Page>
  );
};

export default CreateNewEmployeeVacation;
