import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { css } from '@emotion/css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from '@mui/material/Link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

export default function RecipePage({ data }) {
  const { recipe } = data;
  const { name, date, link, image, rating, favorite, challenge, challengeUrl, ingredients } = recipe;

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
        {favorite && (
          <Box>
            <FavoriteIcon alignSelf="center" fontSize="large" />
          </Box>
        )}

        <Typography variant="h2" fontSize={{ xs: '2rem', sm: '3rem', md: '4rem' }}>
          {name}
        </Typography>
        <Typography variant="body1">{challenge ? `${challenge} • ${formattedDate}` : formattedDate}</Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {link && (
            <Link href={link} target="_blank" rel="noreferrer">
              <Button startIcon={<img src="https://img.icons8.com/color/24/null/cookbook.png" alt="cookbook" />}>
                Recipe Link
              </Button>
            </Link>
          )}
          {challengeUrl && (
            <Link href={challengeUrl} target="_blank" rel="noreferrer">
              <Button startIcon={<img src="https://img.icons8.com/color/24/null/reddit.png" alt="reddit" />}>
                Reddit Challenge
              </Button>
            </Link>
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
        <Box display="flex" justifyContent="center" gap={1}>
          {ingredients.map(ingredient => (
            <Button
              key={ingredient.id}
              startIcon={
                <img src={`https://img.icons8.com/color/24/null/${ingredient.icon}.png`} alt={ingredient.icon} />
              }
            >
              {ingredient.name}
            </Button>
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
      link
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
