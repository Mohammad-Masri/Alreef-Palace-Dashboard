import { Button, Card, Grid, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import MySelect from 'src/components/MySelect/inedx';
import MyTextFailed from 'src/components/MyTextFailed';
import { STATIC_DATA } from 'src/server/static-data';
import * as Yup from 'yup';

const employee_payment_types = [
  {
    _id: '62bedc196bfcc738ce29c884',
    key: 'salary',
    name: 'راتب',
    created_at: '2022-07-01T11:35:53.371Z',
    __v: 0,
  },
  {
    _id: '62bedc196bfcc738ce29c885',
    key: 'reward',
    name: 'منحة',
    created_at: '2022-07-01T11:35:53.374Z',
    __v: 0,
  },
  {
    _id: '62bedc196bfcc738ce29c886',
    key: 'advance',
    name: 'سلفة',
    created_at: '2022-07-01T11:35:53.374Z',
    __v: 0,
  },
];

const EmployeePaymentForm = ({ initialValues, onSubmit, isEdit }) => {
  const createEmployeePaymentSchema = Yup.object().shape({
    description: Yup.string().required('الوصف مطلوب'),
    employee_payment_type_key: Yup.string().required('نوع الدفعة مطلوب'),
    amount: Yup.number('الرجاء ادخال رقم').required('المبلغ مطلوب'),
    date: Yup.string().required('تاريخ الدفعة مطلوب'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: createEmployeePaymentSchema,
    onSubmit,
  });

  let button_label = 'إنشاء';

  if (isEdit == true) {
    button_label = 'تحديث';
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card style={{ padding: 20 }}>
        <Grid container direction="row-reverse" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              multiline
              fullWidth
              id="description"
              name="description"
              label="الوصف"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              type="number"
              id="amount"
              name="amount"
              label="المبلغ"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                endAdornment: <InputAdornment position="end">{STATIC_DATA.DEFAULT_CURRENCY_NAME}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySelect
              fullWidth
              id="employee_payment_type_key"
              name="employee_payment_type_key"
              label="نوع الدفعة"
              value={formik.values.employee_payment_type_key}
              options={employee_payment_types}
              optionValueKey="key"
              optionLabelKey="name"
              onChange={formik.handleChange}
              error={formik.touched.employee_payment_type_key && Boolean(formik.errors.employee_payment_type_key)}
              helperText={formik.touched.employee_payment_type_key && formik.errors.employee_payment_type_key}
              disabled={isEdit}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="date"
              name="date"
              label="تاريخ الدفعة"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              type="date"
            />
          </Grid>
          <Grid item>
            <Button fullWidth size="large" type="submit" variant="contained">
              {button_label}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default EmployeePaymentForm;
