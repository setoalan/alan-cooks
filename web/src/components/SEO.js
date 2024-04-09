import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({ title }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  return (
    <>
      <html lang="en" />
      <title>
        {title ? `${title} | ` : null}
        {site.siteMetadata.title}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      <meta property="og:url" content={site.siteMetadata.siteUrl} />
    </>
  );
}
