import { Stack, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MyLoader from 'src/components/MyLoader';
import Page from 'src/components/Page';
import { fetchOneEmployee } from 'src/store/Employee/actions';
import EmployeeCardDetails from './EmployeeCardDetails';

const ShowEmployeeDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { employee, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    const id = params.id;
    dispatch(fetchOneEmployee(id));
  }, []);

  return (
    <Page title="تفاصيل الموظف">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography variant="h4" gutterBottom>
            تفاصيل الموظف
          </Typography>
        </Stack>
        {loading ? <MyLoader /> : <EmployeeCardDetails employee={employee} />}
      </Container>
    </Page>
  );
};

export default ShowEmployeeDetails;
