// @mui
import { Container, Typography } from '@mui/material';
import { getLoggedUser } from 'src/config/cookies';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const user = getLoggedUser();

  return (
    <Page title="الرئيسية">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          مرحبا بعودتك {user?.name}
        </Typography>
      </Container>
    </Page>
  );
}
