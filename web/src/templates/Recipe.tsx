import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import { css } from '@emotion/css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import SEO from '../components/SEO';
import { PATHNAMES } from '../constants';

export default function RecipePage({ location, data }) {
  const { recipe } = data;
  const { name, date, url, image, rating, favorite, challenge, challengeUrl, ingredients } = recipe;

  const theme = useTheme();

  const formattedDate = new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  const imageData = getImage(image.asset);
  const imageSrc = getSrc(image.asset);
  const isVegetarian = ingredients.every(({ vegetarian }) => vegetarian);

  return (
    <>
      <SEO title={name} url={location.href} image={imageSrc} />
      <Grid container justifyContent="center" my={2}>
        <Grid size={{ sm: 6 }}>
          <Box mb={{ xs: 1, md: 0 }}>
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
        </Grid>
        <Grid size={{ sm: 6 }} alignSelf="center" pl={{ xs: 0, sm: 2 }} textAlign="center">
          {favorite || isVegetarian ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={24} gap={1}>
              {favorite ? (
                <Tooltip title={<Typography>Favorite</Typography>} placement="top">
                  <FavoriteIcon sx={{ height: '100%', width: 'unset', color: theme.palette.favorite.main }} />
                </Tooltip>
              ) : null}
              {isVegetarian ? (
                <Tooltip title={<Typography>Vegetarian</Typography>} placement="top">
                  <img
                    src="https://img.icons8.com/color/56/null/vegetarian-mark.png"
                    alt="vegetarian"
                    height="100%"
                    loading="lazy"
                  />
                </Tooltip>
              ) : null}
            </Box>
          ) : null}
          <Typography variant="h1" mt={1} fontSize={{ xs: '2rem', md: '3rem' }}>
            {name}
          </Typography>
          <>
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={`star-${i}`} fontSize="large" sx={{ color: theme.palette.favorite.main }} />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <StarBorderIcon key={`star-border-${i}`} fontSize="large" sx={{ color: theme.palette.favorite.main }} />
            ))}
          </>
          {challenge ? <Typography>{challenge.toUpperCase()}</Typography> : null}
          <Typography mt={1}>{formattedDate}</Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" mt={1} gap={1} sx={{ whiteSpace: 'nowrap' }}>
            {ingredients.map(({ id, name, slug, icon }) => (
              <Button
                key={id}
                component={Link}
                to={`${PATHNAMES.INGREDIENT}/${slug.current}`}
                variant="outlined"
                size="small"
                startIcon={<img src={`https://img.icons8.com/color/24/null/${icon}.png`} alt={icon} loading="lazy" />}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" mt={1} gap={1}>
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
        </Grid>
      </Grid>
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
        slug {
          current
        }
        icon
        vegetarian
      }
    }
  }
`;
