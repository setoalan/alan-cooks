import * as React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Nav from './Nav';
import theme from '../theme';

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Container maxWidth="lg" sx={{ px: { xs: 2 }, pb: { xs: 2, sm: 4 } }}>
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
}
