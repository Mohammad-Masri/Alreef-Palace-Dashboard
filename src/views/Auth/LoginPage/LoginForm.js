/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';

// @mui
import { IconButton, InputAdornment, Grid, Button } from '@mui/material';
import { useFormik } from 'formik';
// components
import Iconify from '../../../components/Iconify';
import MyTextFailed from '../../../components/MyTextFailed/index';

// ----------------------------------------------------------------------

export default function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    username: '',
    password: '',
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('اسم المستخدم مطلوب'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
  });

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <MyTextFailed
            fullWidth
            id="username"
            name="username"
            label="اسم المستخدم"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item>
          <MyTextFailed
            fullWidth
            id="password"
            name="password"
            label="كلمة المرور"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button fullWidth size="large" type="submit" variant="contained">
            تسجيل الدخول
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
