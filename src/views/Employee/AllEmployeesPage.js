/* eslint-disable arrow-body-style */
import { Container, Stack, Typography, Button, Avatar, Chip, Grid } from '@mui/material';

import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { STATIC_DATA } from 'src/server/static-data';
import RowGrid from 'src/components/RowGrid';
import { checkIfThisStringFoundInAnotherString } from 'src/helper/string';
import MyTable from 'src/components/MyTable';
import MyTableActionMenu from 'src/components/MyTable/MyTableActionMenu';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, fetchEmployees } from 'src/store/Employee/actions';
import MyLoader from 'src/components/MyLoader';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import { convertDateToFormatDate } from 'src/helper/moment';

const AllEmployeesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, employees } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const handelClickDeleteEmployee = (employee_id) => {
    const onDeleteSuccess = () => {
      showSuccessSnackbarMessage('تم حذف الموظف بنجاح');
    };

    const result = window.confirm('هل تريد فعلا حذف هذا الموظف ؟');
    if (result) {
      dispatch(deleteEmployee(employee_id, onDeleteSuccess));
    }
  };

  const handelClickEditEmployee = (employee_id) => {
    navigate('/dashboard/employee/edit/' + employee_id, { replace: true });
  };

  const handelClickShowEmployee = (employee_id) => {
    navigate('/dashboard/employee/show/' + employee_id, { replace: true });
  };

  const handelClickShowFinancialReport = (employee_id) => {
    navigate(`/dashboard/employee/${employee_id}/financial-report`, { replace: true });
  };

  const columns = [
    {
      id: 'id',
      label: 'المعرف',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return employee.id;
      },
    },
    // {
    //   id: 'profile_image_url',
    //   label: 'الصورة الشخصية',
    //   minWidth: 20,
    //   align: 'center',
    //   renderComponent: (employee) => {
    //     return <Avatar src={employee.profile_image_url} />;
    //   },
    // },
    {
      id: 'name',
      label: 'الاسم',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return <Typography variant="subtitle2">{employee.name} </Typography>;
      },
    },
    {
      id: 'phone_number',
      label: 'رقم الهاتف',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return (
          <RowGrid
            children={
              <>
                <Grid item>
                  <Iconify icon="carbon:phone-filled" />
                </Grid>
                <Grid item>{employee.phone_number}</Grid>
              </>
            }
          />
        );
      },
    },
    {
      id: 'salary',
      label: 'الراتب',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return (
          <RowGrid
            children={
              <>
                <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                <Grid item>{employee.salary}</Grid>
              </>
            }
          />
        );
      },
    },
    {
      id: 'one_day_vacation_discount',
      label: 'قيمة خصم الغياب ليوم واحد',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return (
          <RowGrid
            children={
              <>
                <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                <Grid item>{employee.one_day_vacation_discount}</Grid>
              </>
            }
          />
        );
      },
    },
    {
      id: 'position',
      label: 'الوظيفة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return employee.position;
      },
    },
    {
      id: 'in_working',
      label: 'حالة العمل',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        let color = null;
        let label = null;
        if (employee.in_working) {
          color = 'success';
          label = 'يعمل';
        } else {
          color = 'warning';
          label = 'متوقف عن العمل';
        }

        return <Chip label={label} color={color} />;
      },
    },
    {
      id: 'birthday',
      label: 'تاريخ الميلاد',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return convertDateToFormatDate(employee.birthday);
      },
    },
    {
      id: 'joining_date',
      label: 'تاريخ الانضمام',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return convertDateToFormatDate(employee.joining_date);
      },
    },
    {
      id: 'actions',
      label: '',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee) => {
        return (
          <MyTableActionMenu
            objectId={employee.id}
            showOption={1}
            handleClickShow={handelClickShowEmployee}
            showFinancialReport={1}
            handleClickShowFinancialReport={handelClickShowFinancialReport}
            deleteOption={1}
            handleClickDelete={handelClickDeleteEmployee}
            editOption={1}
            handleClickEdit={handelClickEditEmployee}
          />
        );
      },
    },
  ];

  const [searchTextValue, setSearchTextValue] = useState('');
  const handleSearchTextValueChange = (event) => {
    setSearchTextValue(event.target.value);
  };

  let filtered_employees = employees;
  if (searchTextValue != '' && searchTextValue != null) {
    filtered_employees = employees.filter((employee) => {
      let match = false;
      if (
        checkIfThisStringFoundInAnotherString(employee.name, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee.phone_number, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee.position, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee.id, searchTextValue)
      ) {
        match = true;
      }

      return match;
    });
  }

  const is_employees_not_found = filtered_employees?.length === 0;

  return (
    <Page title="الموظفون">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/employee/create"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            موظف جديد
          </Button>
          <Typography variant="h4" gutterBottom>
            الموظفون
          </Typography>
        </Stack>

        {loading ? (
          <MyLoader />
        ) : (
          <MyTable
            searchTextValue={searchTextValue}
            handleSearchTextValueChange={handleSearchTextValueChange}
            searchTextPlaceholder="البحث عن موظف"
            columns={columns}
            data={filtered_employees}
            isDataFound={is_employees_not_found}
            allDataCount={employees?.length}
          />
        )}
      </Container>
    </Page>
  );
};

export default AllEmployeesPage;
