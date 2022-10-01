import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MyLoader from 'src/components/MyLoader';
import Page from 'src/components/Page';
import { convertDateToFormatDate } from 'src/helper/moment';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { fetchEmployeeVacation, updateEmployeeVacation } from 'src/store/Employee/actions';
import EmployeeVacationForm from './EmployeeVacationForm';

const EditEmployeeVacationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, employee_vacation } = useSelector((state) => state.employee);
  const { from_date, to_date } = useSelector((state) => state.employee.financial_report);

  const params = useParams();

  useEffect(() => {
    const { employee_vacation_id } = params;
    dispatch(fetchEmployeeVacation(employee_vacation_id));
  }, [dispatch, params]);

  const initialValues = {
    employee_id: params.employee_id,
    reason: employee_vacation.reason,
    discount_value: employee_vacation.discount_value,
    date: convertDateToFormatDate(employee_vacation.date),
  };

  const onUpdateSuccess = () => {
    navigate(`/dashboard/employee/${params.employee_id}/financial-report`, { replace: true });
    showSuccessSnackbarMessage('تم تعديل الإجازة بنجاح');
  };

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateEmployeeVacation(params.employee_vacation_id, values, from_date, to_date, onUpdateSuccess));
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
        {loading ? <MyLoader /> : <EmployeeVacationForm initialValues={initialValues} onSubmit={onSubmit} isEdit />}
      </Container>
    </Page>
  );
};

export default EditEmployeeVacationPage;
