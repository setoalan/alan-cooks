import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({ image, url, title }) {
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
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      <meta name="author" content="Alan Seto" />
      <meta property="og:title" content={title ? `${title} by Alan` : site.siteMetadata.title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || '../images/og_image.png'} />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={title ? `Alan cooked up some ${title}!` : site.siteMetadata.description}
      />
      <meta property="og:locale" content="en_US" />
      <title>
        {title ? `${title} | ` : null}
        {site.siteMetadata.title}
      </title>
    </>
  );
}
