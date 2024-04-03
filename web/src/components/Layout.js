import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <Container maxWidth="lg" sx={{ px: { xs: 2 } }}>
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
}
