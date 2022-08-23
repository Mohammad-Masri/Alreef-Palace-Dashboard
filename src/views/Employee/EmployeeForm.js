import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Grid, InputAdornment, Card } from '@mui/material';
import MyTextFailed from 'src/components/MyTextFailed';
import { STATIC_DATA } from 'src/server/static-data';
import MySwitch from 'src/components/MySwitch';

const EmployeeForm = ({ initialValues, onSubmit, isEdit }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const createEmployeeSchema = Yup.object().shape({
    name: Yup.string().required('الاسم مطلوب'),
    phone_number: Yup.string().matches(phoneRegExp, 'لا يبدو انه رقم هاتف صحيح').required('رقم الهاتف مطلوب'),
    salary: Yup.number('الرجاء ادخال رقم').required('الراتب مطلوب'),
    position: Yup.string().required('الوظيفة مطلوبة'),
    birthday: null,
    // in_working: Yup.boolean().required('حالة العمل مطلوبة'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: createEmployeeSchema,
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
              fullWidth
              id="name"
              name="name"
              label="الاسم"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="phone_number"
              name="phone_number"
              label="رقم الهاتف"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              helperText={formik.touched.phone_number && formik.errors.phone_number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="position"
              name="position"
              label="الوظيفة"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="salary"
              name="salary"
              label="الراتب"
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
              InputProps={{
                endAdornment: <InputAdornment position="end">{STATIC_DATA.DEFAULT_CURRENCY_NAME}</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MyTextFailed
              fullWidth
              id="birthday"
              name="birthday"
              label="تاريخ الميلاد"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
              type="date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySwitch
              label="حالة العمل"
              id="in_working"
              name="in_working"
              value={formik.values.in_working}
              onChange={formik.handleChange}
              checked={formik.values.in_working}
              error={formik.touched.in_working && Boolean(formik.errors.in_working)}
              helperText={formik.touched.in_working && formik.errors.in_working}
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

export default EmployeeForm;