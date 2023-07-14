import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { createEmployee } from 'src/store/Employee/actions';
import EmployeeForm from './EmployeeForm';

const CreateNewEmployeePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    phone_number: '',
    birthday: '',
    joining_date: '',
    salary: '',
    one_day_vacation_discount: '',
    position: '',
    in_working: true,
  };

  const onCreateSuccess = () => {
    navigate('/dashboard/employee', { replace: true });
    showSuccessSnackbarMessage('تم إنشاء الموظف بنجاح');
  };

  const onSubmit = (values) => {
    console.log('values\n', values);

    dispatch(createEmployee(values, onCreateSuccess));
  };

  return (
    <Page title="إنشاء موظف">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            إنشاء موظف جديد
          </Typography>
        </Stack>
        <EmployeeForm initialValues={initialValues} onSubmit={onSubmit} />
      </Container>
    </Page>
  );
};

export default CreateNewEmployeePage;
