import * as React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './src/components/Layout';
import type { GatsbyBrowser } from 'gatsby';

export function replaceHydrateFunction() {
  return (element, container) => {
    const root = ReactDOM.createRoot(container);
    root.render(element);
  };
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  return (
    <>
      <CssBaseline />
      <Layout {...props}>{element}</Layout>
    </>
  );
};
