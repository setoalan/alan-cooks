require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'Alan Cooks',
    siteUrl: 'https://www.alancooks.recipes',
    description: 'Alan cooks recipes!',
  },
  trailingSlash: 'always',
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/chef.png',
      },
    },
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
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
      },
    },
  ],
};
