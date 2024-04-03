import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { css } from '@emotion/css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SEO from '../components/SEO';

export default function RecipePage({ data }) {
  const { recipe } = data;
  const { name, date, url, image, rating, favorite, challenge, challengeUrl, ingredients } = recipe;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  const imageData = getImage(image.asset);
  const isVegetarian = ingredients.every(({ vegetarian }) => vegetarian);

  return (
    <>
      <SEO title={name} />
      <Grid2 container justifyContent="center" my={2}>
        <Grid2 sm={6}>
          <Box sx={{ mb: { xs: 1, md: 0 } }}>
            <GatsbyImage
              image={imageData}
              alt={name}
              imgClassName={css`
                transition: all 0.75s ease-in-out !important;
                &:hover {
                  transform: scale(1.5);
                }
              `}
            />
          </Box>
        </Grid2>
        <Grid2 sm={6} alignSelf="center" pl={{ xs: 0, sm: 2 }} textAlign="center">
          {favorite || isVegetarian ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', gap: 1 }}>
              {favorite ? <FavoriteIcon sx={{ height: '100%', width: 'unset', color: '#ffc107' }} /> : null}
              {isVegetarian ? (
                <img
                  src="https://img.icons8.com/color/56/null/vegetarian-mark.png"
                  alt="vegetarian"
                  height="80%"
                  loading="lazy"
                />
              ) : null}
            </Box>
          ) : null}
          <Typography variant="h1" fontSize={{ xs: '2rem', md: '3rem' }}>
            {name}
          </Typography>
          <>
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={`star-${i}`} fontSize="large" sx={{ color: '#ffc107' }} />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <StarBorderIcon key={`star-border-${i}`} fontSize="large" sx={{ color: '#ffc107' }} />
            ))}
          </>
          {challenge ? <Typography> {challenge.toUpperCase()}</Typography> : null}
          <Typography>{formattedDate}</Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} sx={{ whiteSpace: 'nowrap' }}>
            {ingredients.map(({ id, name, icon }) => (
              <Button
                key={id}
                component={Link}
                to={`/ingredient/${name.toLowerCase()}`}
                variant="outlined"
                size="small"
                startIcon={<img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} loading="lazy" />}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">
                <Button
                  size="small"
                  startIcon={
                    <img src="https://img.icons8.com/color/24/null/cookbook.png" alt="cookbook" loading="lazy" />
                  }
                  endIcon={<OpenInNewIcon />}
                >
                  View Recipe
                </Button>
              </a>
            ) : null}
            {challengeUrl ? (
              <a href={challengeUrl} target="_blank" rel="noreferrer">
                <Button
                  size="small"
                  startIcon={<img src="https://img.icons8.com/color/24/null/reddit.png" alt="reddit" loading="lazy" />}
                  endIcon={<OpenInNewIcon />}
                >
                  View Reddit Challenge
                </Button>
              </a>
            ) : null}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export const query = graphql`
  query ($slug: String!) {
    recipe: sanityRecipe(slug: { current: { eq: $slug } }) {
      id
      name
      date
      url
      image {
        asset {
          gatsbyImageData(width: 600, placeholder: BLURRED)
        }
      }
      rating
      favorite
      challenge
      challengeUrl: challenge_url
      ingredients {
        id
        name
        icon
        vegetarian
      }
    }
  }
`;
