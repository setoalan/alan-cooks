import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
  return (
    <Container maxWidth="lg" sx={{ paddingX: { xs: 1, sm: 2 } }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
