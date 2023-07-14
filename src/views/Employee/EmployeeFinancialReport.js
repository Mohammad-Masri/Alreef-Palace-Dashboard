/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-body-style */
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
  getStartTimeOfThisDay,
} from 'src/helper/moment';
import { checkIfThisStringFoundInAnotherString } from 'src/helper/string';
import { STATIC_DATA } from 'src/server/static-data';
import MyTableActionMenu from 'src/components/MyTable/MyTableActionMenu';
import { showSuccessSnackbarMessage } from 'src/helper/snackbar';
import {
  deleteEmployeePayment,
  deleteEmployeeVacation,
  fetchEmployeeFinancialReport,
} from 'src/store/Employee/actions';
import EmployeeCardDetails from './EmployeeCardDetails';

const EmployeeFinancialReport = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, financial_report } = useSelector((state) => state.employee);

  const employee_payments = financial_report?.employee_payments;
  const employee_vacations = financial_report?.employee_vacations;
  const employee = financial_report?.employee;
  const net_account = financial_report?.net_account;
  const from_date = financial_report?.from_date;
  const to_date = financial_report?.to_date;

  const [startDay, setStartDay] = useState(from_date);
  const [endDay, setEndDay] = useState(to_date);

  useEffect(() => {
    const employee_id = params.employee_id;
    const from_date = startDay;
    const to_date = endDay;
    dispatch(fetchEmployeeFinancialReport(employee_id, from_date, to_date));
  }, []);

  const handleStartDayChange = (event) => {
    const selected_date = event.target.value;

    const first_time_of_day = getStartTimeOfThisDay(selected_date);
    setStartDay(first_time_of_day);

    const employee_id = params.employee_id;
    const from_date = first_time_of_day;
    const to_date = endDay;
    dispatch(fetchEmployeeFinancialReport(employee_id, from_date, to_date));
  };

  const handleEndDayChange = (event) => {
    const selected_date = event.target.value;
    const last_time_of_day = getEndTimeOfThisDay(selected_date);
    setEndDay(last_time_of_day);

    const employee_id = params.employee_id;
    const from_date = startDay;
    const to_date = last_time_of_day;
    dispatch(fetchEmployeeFinancialReport(employee_id, from_date, to_date));
  };

  const handelClickDeleteEmployeePayment = (employee_payment_id) => {
    const onDeleteSuccess = () => {
      showSuccessSnackbarMessage('تم حذف الدفعة بنجاح');
    };

    const result = window.confirm('هل تريد فعلا حذف هذه الدفعة ؟');
    const from_date = startDay;
    const to_date = endDay;

    if (result) {
      dispatch(deleteEmployeePayment(employee_payment_id, from_date, to_date, onDeleteSuccess));
    }
  };
  const handelClickEditEmployeePayment = (employee_payment_id) => {
    navigate(`/dashboard/employee/${params.employee_id}/employee-payment/edit/${employee_payment_id}`, {
      replace: true,
    });
  };

  const handelClickDeleteEmployeeVacation = (employee_vacation_id) => {
    const onDeleteSuccess = () => {
      showSuccessSnackbarMessage('تم حذف الإجازة بنجاح');
    };

    const result = window.confirm('هل تريد فعلا حذف هذه الإجازة ؟');
    const from_date = startDay;
    const to_date = endDay;

    if (result) {
      dispatch(deleteEmployeeVacation(employee_vacation_id, from_date, to_date, onDeleteSuccess));
    }
  };
  const handelClickEditEmployeeVacation = (employee_vacation_id) => {
    navigate(`/dashboard/employee/${params.employee_id}/employee-vacation/edit/${employee_vacation_id}`, {
      replace: true,
    });
  };

  const employee_payment_columns = [
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

  const employee_vacation_columns = [
    {
      id: 'id',
      label: 'المعرف',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return employee_vacation.id;
      },
    },
    {
      id: 'reason',
      label: 'السبب',
      minWidth: 300,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return employee_vacation.reason;
      },
    },
    {
      id: 'discount_value',
      label: 'المبلغ',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return (
          <RowGrid
            children={
              <>
                <Grid item>{STATIC_DATA.DEFAULT_CURRENCY_NAME}</Grid>
                <Grid item>{employee_vacation.discount_value}</Grid>
              </>
            }
          />
        );
      },
    },

    {
      id: 'date',
      label: 'تاريخ الإجازة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return convertDateToFormatDate(employee_vacation.date);
      },
    },
    {
      id: 'created_at',
      label: 'تاريخ تسجيل الاجازة',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return convertDateToFormatDateAndTime(employee_vacation.created_at);
      },
    },
    {
      id: 'actions',
      label: '',
      minWidth: 200,
      align: 'center',
      renderComponent: (employee_vacation) => {
        return (
          <MyTableActionMenu
            objectId={employee_vacation.id}
            showOption={0}
            handleClickShow={null}
            showPaymentsOption={0}
            handleClickShowPayments={null}
            deleteOption={1}
            handleClickDelete={handelClickDeleteEmployeeVacation}
            editOption={1}
            handleClickEdit={handelClickEditEmployeeVacation}
          />
        );
      },
    },
  ];

  const [searchTextValueEmployeePayment, setSearchTextValueEmployeePayment] = useState('');
  const handleSearchTextValueEmployeePaymentChange = (event) => {
    setSearchTextValueEmployeePayment(event.target.value);
  };

  const [searchTextValueEmployeeVacation, setSearchTextValueEmployeeVacation] = useState('');
  const handleSearchTextValueEmployeeVacationChange = (event) => {
    setSearchTextValueEmployeeVacation(event.target.value);
  };

  let filtered_employee_payments = employee_payments;
  if (searchTextValueEmployeePayment != '' && searchTextValueEmployeePayment != null) {
    filtered_employee_payments = employee_payments.filter((employee_payment) => {
      let match = false;
      if (
        checkIfThisStringFoundInAnotherString(employee_payment.id, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_payment.description, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_payment.amount, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_payment.date, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_payment.created_at, searchTextValueEmployeePayment)
      ) {
        match = true;
      }

      return match;
    });
  }
  const is_employee_payments_not_found = filtered_employee_payments?.length === 0;

  let filtered_employee_vacations = employee_vacations;
  if (searchTextValueEmployeePayment != '' && searchTextValueEmployeePayment != null) {
    filtered_employee_vacations = employee_vacations.filter((employee_vacation) => {
      let match = false;
      if (
        checkIfThisStringFoundInAnotherString(employee_vacation.id, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_vacation.reason, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_vacation.discount_value, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_vacation.date, searchTextValueEmployeePayment) ||
        checkIfThisStringFoundInAnotherString(employee_vacation.created_at, searchTextValueEmployeePayment)
      ) {
        match = true;
      }

      return match;
    });
  }
  const is_employee_vacations_not_found = filtered_employee_vacations?.length === 0;

  return (
    <Page title="السجل المالي">
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Stack direction="row-reverse" justifyContent="flex-start" alignItems="center">
              <Typography variant="h4" gutterBottom>
                السجل المالي للموظف
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/dashboard/employee/${params.employee_id}/employee-payment/create`}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                تسجيل دفعة جديدة
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/dashboard/employee/${params.employee_id}/employee-vacation/create`}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                تسجيل إجازة جديدة
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              {loading ? <MyLoader /> : <EmployeeCardDetails employee={employee} />}
            </Stack>
          </Grid>
        </Grid>

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
                  title="الدفعات"
                  searchTextValue={searchTextValueEmployeePayment}
                  handleSearchTextValueChange={handleSearchTextValueEmployeePaymentChange}
                  searchTextPlaceholder="البحث عن دفعة"
                  columns={employee_payment_columns}
                  data={filtered_employee_payments}
                  isDataFound={is_employee_payments_not_found}
                  allDataCount={employee_payments?.length}
                />
              </Grid>
              <Grid item xs={12}>
                <MyTable
                  title="الإجازات"
                  searchTextValue={searchTextValueEmployeeVacation}
                  handleSearchTextValueChange={handleSearchTextValueEmployeeVacationChange}
                  searchTextPlaceholder="البحث عن إجازة"
                  columns={employee_vacation_columns}
                  data={filtered_employee_vacations}
                  isDataFound={is_employee_vacations_not_found}
                  allDataCount={employee_vacations?.length}
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

export default EmployeeFinancialReport;
