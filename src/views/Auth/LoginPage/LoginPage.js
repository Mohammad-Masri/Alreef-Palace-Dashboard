// imports
import { Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';
import Page from '../../../components/Page';
import LoginForm from './LoginForm';

import { login } from '../../../store/Auth/actions';
import { showSuccessSnackbarMessage } from '../../../helper/snackbar';

// style
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// component
export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    showSuccessSnackbarMessage('تم تسجيل الدخول بنجاح');
    navigate('/dashboard/app', { replace: true });
  };

  const onSubmit = (values) => {
    console.log('values\n', values);
    dispatch(login(values.username, values.password, onLoginSuccess));
  };

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              مرحبا بعودتك
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              تسجيل الدخول
            </Typography>

            <LoginForm onSubmit={onSubmit} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
