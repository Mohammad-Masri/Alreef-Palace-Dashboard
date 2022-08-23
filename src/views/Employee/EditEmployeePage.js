import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MyLoader from 'src/components/MyLoader';
import Page from 'src/components/Page';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { fetchOneEmployee, updateOneEmployee } from 'src/store/Employee/actions';
import EmployeeForm from './EmployeeForm';

const EditEmployeePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { employee, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    const id = params.id;
    dispatch(fetchOneEmployee(id));
  }, []);

  const initialValues = {
    name: employee?.name,
    phone_number: employee?.phone_number,
    birthday: employee?.birthday,
    salary: employee?.salary,
    position: employee?.position,
    in_working: employee?.in_working,
  };

  const onUpdateSuccess = () => {
    navigate('/dashboard/employee', { replace: true });
    showSuccessSnackbarMessage('تم تعديل الموظف بنجاح');
  };

  const onSubmit = (values) => {
    const id = params.id;
    console.log('values\n', values);

    dispatch(updateOneEmployee(id, values, onUpdateSuccess));
  };

  return (
    <Page title="تعديل موظف">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            تعديل الموظف
          </Typography>
        </Stack>
        {loading ? <MyLoader /> : <EmployeeForm initialValues={initialValues} onSubmit={onSubmit} isEdit />}
      </Container>
    </Page>
  );
};

export default EditEmployeePage;
