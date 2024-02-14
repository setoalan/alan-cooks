require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'Alan Cooks',
    siteUrl: 'https://www.alancooks.recipes',
    description: 'Alan cooks recipes!',
  },
  trailingSlash: `always`,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    'gatsby-transformer-sharp',
  ],
};
