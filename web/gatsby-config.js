module.exports = {
  siteMetadata: {
    title: `Alan Cooks`,
    siteUrl: `https://www.alancooks.recipes`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'edb0ptmz',
        dataset: 'production',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
  ],
};
