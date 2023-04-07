import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return (
    <>
      <CssBaseline />
      <Layout {...props}>{element}</Layout>
    </>
  );
}
