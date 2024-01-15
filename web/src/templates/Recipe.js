import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { css } from '@emotion/css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';

export default function RecipePage({ data }) {
  const { recipe } = data;
  const { name, date, url, image, rating, favorite, challenge, challengeUrl, ingredients } = recipe;

  const formattedDate = new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const imageData = getImage(image.asset);

  return (
    <Grid2 container>
      <Grid2 sm={6} marginBottom={{ xs: 3, sm: 0 }}>
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
      </Grid2>
      <Grid2 sm={6} alignSelf="center" paddingLeft={{ xs: 0, sm: 3 }} textAlign="center">
        {favorite && <FavoriteIcon fontSize="large" />}
        <Typography variant="h2" fontSize={{ xs: '2rem', sm: '3rem', md: '4rem' }}>
          {name}
        </Typography>
        <Typography variant="body1">
          {challenge ? `${challenge.toUpperCase()} • ${formattedDate}` : formattedDate}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {url && (
            <a href={url} target="_blank" rel="noreferrer">
              <Button
                startIcon={<img src="https://img.icons8.com/color/24/null/cookbook.png" alt="cookbook" />}
                endIcon={<OpenInNewIcon />}
              >
                View Recipe
              </Button>
            </a>
          )}
          {challengeUrl && (
            <a href={challengeUrl} target="_blank" rel="noreferrer">
              <Button
                startIcon={<img src="https://img.icons8.com/color/24/null/reddit.png" alt="reddit" />}
                endIcon={<OpenInNewIcon />}
              >
                View Reddit Challenge
              </Button>
            </a>
          )}
        </Box>
        <Box>
          {[...Array(rating)].map((_, i) => (
            <StarIcon key={`star-${i}`} fontSize="large" />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <StarBorderIcon key={`star-border-${i}`} fontSize="large" />
          ))}
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} sx={{ whiteSpace: 'nowrap' }}>
          {ingredients.map(({ id, name, icon }) => (
            <Link key={id} to={`/ingredient/${name.toLowerCase()}`}>
              <Button startIcon={<img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} />}>
                {name}
              </Button>
            </Link>
          ))}
        </Box>
      </Grid2>
    </Grid2>
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
