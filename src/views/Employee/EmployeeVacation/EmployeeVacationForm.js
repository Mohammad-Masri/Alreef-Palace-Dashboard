import { Button, Card, Grid, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import MySelect from 'src/components/MySelect/inedx';
import MyTextFailed from 'src/components/MyTextFailed';
import { STATIC_DATA } from 'src/server/static-data';
import * as Yup from 'yup';

const EmployeeVacationForm = ({ initialValues, onSubmit, isEdit }) => {
  const createEmployeeVacationSchema = Yup.object().shape({
    reason: null,
    discount_value: Yup.number('الرجاء ادخال رقم').required('قيمة الخصم مطلوبة'),
    date: Yup.string().required('تاريخ الإجازة مطلوب'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: createEmployeeVacationSchema,
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
              id="reason"
              name="reason"
              label="السبب"
              value={formik.values.reason}
              onChange={formik.handleChange}
              error={formik.touched.reason && Boolean(formik.errors.reason)}
              helperText={formik.touched.reason && formik.errors.reason}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              type="discount_value"
              id="discount_value"
              name="discount_value"
              label="قيمة الخصم"
              value={formik.values.discount_value}
              onChange={formik.handleChange}
              error={formik.touched.discount_value && Boolean(formik.errors.discount_value)}
              helperText={formik.touched.discount_value && formik.errors.discount_value}
              InputProps={{
                endAdornment: <InputAdornment position="end">{STATIC_DATA.DEFAULT_CURRENCY_NAME}</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="date"
              name="date"
              label="تاريخ الإجازة"
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

export default EmployeeVacationForm;
