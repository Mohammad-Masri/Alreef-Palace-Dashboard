import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { removeAccessToken, removeLoggedUser } from './config/cookies';
import { checkAuth } from './store/Auth/actions';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCheckAuthFailed = async () => {
    await removeAccessToken();
    await removeLoggedUser();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    dispatch(checkAuth(onCheckAuthFailed));
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
