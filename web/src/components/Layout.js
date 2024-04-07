import * as React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Nav from './Nav';
import theme from '../theme';

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Container maxWidth="lg" sx={{ px: { xs: 2 } }}>
        <main>{children}</main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
