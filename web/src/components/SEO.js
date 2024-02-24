import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({ title }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <html lang="en" />
      <title>
        {title && `${title} | `}
        {site.siteMetadata.title}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {location ? <meta property="og:url" content={location.href} /> : null}
    </>
  );
}
