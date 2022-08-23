import { Stack, Container, Typography, Grid, Chip, Card, CardHeader, CardContent, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import MyLoader from 'src/components/MyLoader';
import MyTable from 'src/components/MyTable';
import MyTextFailed from 'src/components/MyTextFailed';
import Page from 'src/components/Page';
import RowGrid from 'src/components/RowGrid';
import Iconify from 'src/components/Iconify';
import {
  convertDateToFormatDate,
  convertDateToFormatDateAndTime,
  getEndTimeOfThisDay,
  getFirstDayOfThisMonth,
  getLastDayOfThisMonth,
  getNowMonthHelper,
  getStartTimeOfThisDay,
} from 'src/helper/moment';
import { checkIfThisStringFoundInAnotherString } from 'src/helper/string';
import { STATIC_DATA } from 'src/server/static-data';
import { deleteEmployeePayment, fetchEmployeePayments } from 'src/store/EmployeePayment/actions';
import MyTableActionMenu from 'src/components/MyTable/MyTableActionMenu';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import EmployeeCardDetails from '../EmployeeCardDetails';

const AllEmployeePayments = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, employee_payments, employee, net_account, from_date, to_date } = useSelector(
    (state) => state.employee_payment
  );

  // const now_month = getNowMonthHelper();
  // const first_day_of_month = getFirstDayOfThisMonth(now_month);
  // const last_day_of_month = getLastDayOfThisMonth(now_month);
  // const first_time_of_day = getStartTimeOfThisDay(first_day_of_month);
  // const last_time_of_day = getEndTimeOfThisDay(last_day_of_month);

  const [startDay, setStartDay] = useState(from_date);
  const [endDay, setEndDay] = useState(to_date);

  useEffect(() => {
    const employee_id = params.employee_id;
    const from_date = startDay;
    const to_date = endDay;
    dispatch(fetchEmployeePayments(employee_id, from_date, to_date));
  }, []);

  const handleStartDayChange = (event) => {
    const selected_date = event.target.value;

    const first_time_of_day = getStartTimeOfThisDay(selected_date);
    setStartDay(first_time_of_day);

    const employee_id = params.employee_id;
    const from_date = first_time_of_day;
    const to_date = endDay;
    dispatch(fetchEmployeePayments(employee_id, from_date, to_date));
  };

  const handleEndDayChange = (event) => {
    const selected_date = event.target.value;
    const last_time_of_day = getEndTimeOfThisDay(selected_date);
    setEndDay(last_time_of_day);

    const employee_id = params.employee_id;
    const from_date = startDay;
    const to_date = last_time_of_day;
    dispatch(fetchEmployeePayments(employee_id, from_date, to_date));
  };

  const handelClickDeleteEmployeePayment = (employee_payment_id) => {
    const onDeleteSuccess = () => {
      showSuccessSnackbarMessage('تم حذف الدفعة بنجاح');
    };

    const result = window.confirm('هل تريد فعلا حذف هذه الدفعة ؟');
    const from_date = startDay;
    const to_date = endDay;
    console.log('from_date : ', from_date);
    console.log('typeof from_date : ', typeof from_date);
    console.log('to_date : ', to_date);
    console.log('typeof to_date : ', typeof to_date);
    if (result) {
      dispatch(deleteEmployeePayment(employee_payment_id, from_date, to_date));
    }
  };
  const handelClickEditEmployeePayment = (employee_payment_id) => {
    navigate(`/dashboard/employee/${params.employee_id}/employee-payment/edit/${employee_payment_id}`, {
      replace: true,
    });
  };

  const columns = [
    {
      id: 'id',
      label: 'المعرف',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        return employee_payment.id;
      },
    },
    {
      id: 'description',
      label: 'التفاصيل',
      minWidth: 300,
      align: 'center',
      renderComponent: (employee_payment) => {
        return employee_payment.description;
      },
    },
    {
      id: 'amount',
      label: 'المبلغ',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        return (
          <RowGrid
            children={
              <>
                <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                <Grid item>{employee_payment.amount}</Grid>
              </>
            }
          />
        );
      },
    },
    {
      id: 'type_name',
      label: 'نوع الدفعة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        const label = employee_payment.type_name;
        let color = null;

        switch (employee_payment.type_key) {
          case STATIC_DATA.EMPLOYEE_PAYMENT_TYPES.SALARY: {
            color = 'primary';
            break;
          }
          case STATIC_DATA.EMPLOYEE_PAYMENT_TYPES.REWARD: {
            color = 'success';
            break;
          }
          case STATIC_DATA.EMPLOYEE_PAYMENT_TYPES.ADVANCE: {
            color = 'warning';
            break;
          }
          default:
            break;
        }

        return <Chip variant="outlined" label={label} color={color} />;
      },
    },
    {
      id: 'date',
      label: 'تاريخ الدفعة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        return convertDateToFormatDate(employee_payment.date);
      },
    },
    {
      id: 'created_at',
      label: 'تاريخ تسجيل الدفعة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        return convertDateToFormatDateAndTime(employee_payment.created_at);
      },
    },
    {
      id: 'actions',
      label: '',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_payment) => {
        return (
          <MyTableActionMenu
            objectId={employee_payment.id}
            showOption={0}
            handleClickShow={null}
            showPaymentsOption={0}
            handleClickShowPayments={null}
            deleteOption={1}
            handleClickDelete={handelClickDeleteEmployeePayment}
            editOption={1}
            handleClickEdit={handelClickEditEmployeePayment}
          />
        );
      },
    },
  ];

  const [searchTextValue, setSearchTextValue] = useState('');
  const handleSearchTextValueChange = (event) => {
    setSearchTextValue(event.target.value);
  };

  let filtered_employee_payments = employee_payments;
  if (searchTextValue != '' && searchTextValue != null) {
    filtered_employee_payments = employee_payments.filter((employee_payment) => {
      let match = false;
      if (
        checkIfThisStringFoundInAnotherString(employee_payment.id, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee_payment.description, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee_payment.amount, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee_payment.date, searchTextValue) ||
        checkIfThisStringFoundInAnotherString(employee_payment.created_at, searchTextValue)
      ) {
        match = true;
      }

      return match;
    });
  }

  const is_employee_payments_not_found = filtered_employee_payments?.length === 0;

  return (
    <Page title="تفاصيل دفعات الموظف">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/employee/${params.employee_id}/employee-payment/create`}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            تسجيل دفعة جديدة
          </Button>
          <Typography variant="h4" gutterBottom>
            تفاصيل دفعات الموظف
          </Typography>
        </Stack>

        {loading ? <MyLoader /> : <EmployeeCardDetails employee={employee} />}

        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ padding: 20 }} spacing={1}>
          <Grid item xs={6}>
            <MyTextFailed
              fullWidth
              id="startDay"
              name="startDay"
              label="من تاريخ"
              value={convertDateToFormatDate(startDay)}
              onChange={handleStartDayChange}
              type="date"
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextFailed
              fullWidth
              id="endDay"
              name="endDay"
              label="إلى تاريخ"
              value={convertDateToFormatDate(endDay)}
              onChange={handleEndDayChange}
              type="date"
            />
          </Grid>

          {loading ? (
            <MyLoader />
          ) : (
            <>
              <Grid item xs={12}>
                <MyTable
                  searchTextValue={searchTextValue}
                  handleSearchTextValueChange={handleSearchTextValueChange}
                  searchTextPlaceholder="البحث عن دفعة"
                  columns={columns}
                  data={filtered_employee_payments}
                  isDataFound={is_employee_payments_not_found}
                  allDataCount={employee_payments?.length}
                />
              </Grid>
              <Grid item xs={12}>
                <Card style={{ padding: 20 }}>
                  <CardHeader title="نظرة عامة" style={{ color: '#2065D1' }} />
                  <CardContent>
                    <Grid container direction="row-reverse" justifyContent="center" alignItems="center" spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <RowGrid
                          children={
                            <>
                              <Grid item>
                                {convertDateToFormatDateAndTime(startDay) == '' ? (
                                  <>غير محدد</>
                                ) : (
                                  convertDateToFormatDateAndTime(startDay)
                                )}
                              </Grid>
                              <Grid item>
                                <Iconify icon="bi:calendar-date" style={{ fontSize: '36px' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2">من تاريخ</Typography>
                              </Grid>
                            </>
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <RowGrid
                          children={
                            <>
                              <Grid item>
                                {convertDateToFormatDateAndTime(endDay) == '' ? (
                                  <>غير محدد</>
                                ) : (
                                  convertDateToFormatDateAndTime(endDay)
                                )}
                              </Grid>
                              <Grid item>
                                <Iconify icon="bi:calendar-date" style={{ fontSize: '36px' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2">إلى تاريخ</Typography>
                              </Grid>
                            </>
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <RowGrid
                          children={
                            <>
                              <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                              <Grid item>{net_account}</Grid>
                              <Grid item>
                                <Iconify icon="flat-color-icons:money-transfer" style={{ fontSize: '36px' }} />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2">الصافي</Typography>
                              </Grid>
                            </>
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default AllEmployeePayments;
