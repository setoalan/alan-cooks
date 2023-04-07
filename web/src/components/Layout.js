import * as React from 'react';
import Container from '@mui/material/Container';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Container maxWidth="lg">
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
