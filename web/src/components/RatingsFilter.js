import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Star from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { FILTER_RATING_OPTIONS, PATHNAMES, RATING_CARDINALS, FILTER_RATING_DEFAULT } from '../constants';

const { Fragment } = React;

const getRatingsWithCounts = (recipes) => {
  const ratingCounts = recipes
    .map(({ rating }) => rating)
    .reduce((acc, rating) => {
      const existingRating = acc[rating];

      if (existingRating) {
        existingRating.count += 1;
      } else {
        acc[rating] = {
          count: 1,
        };
      }

      return acc;
    }, {});

  return Object.values(ratingCounts).reverse();
};

const getButtonContent = (isFilterRatingDefault, filterRatingOption, theme) => {
  if (isFilterRatingDefault) {
    return <img src={`https://img.icons8.com/color/24/null/infinity.png`} alt="All ratings" loading="lazy" />;
  }

  return (
    <>
      <Box display={{ xs: 'flex', sm: 'none' }} alignItems="center" justifyContent="center">
        <Typography>{filterRatingOption} </Typography>
        <Star fontSize="small" sx={{ color: theme.palette.favorite.main }} />
      </Box>
      {[...Array(filterRatingOption)].map((_, i) => (
        <Box key={`${filterRatingOption}-star-${i}`} display={{ xs: 'none', sm: 'flex' }} justifyContent="center">
          <Star fontSize="small" sx={{ color: theme.palette.favorite.main }} />
        </Box>
      ))}
    </>
  );
};

export default function RatingsFilter({ activeRating }) {
  const theme = useTheme();

  const { HOME, RATING } = PATHNAMES;

  const { recipes } = useStaticQuery(graphql`
    query {
      recipes: allSanityRecipe {
        nodes {
          rating
        }
      }
    }
  `);

  const ratings = [{ count: recipes.nodes.length }, ...getRatingsWithCounts(recipes.nodes)];

  return (
    <Paper square sx={{ mt: 2, px: { xs: 1, md: 2 }, py: 1 }}>
      <ButtonGroup variant="outlined" aria-label="Ratings Filter" fullWidth>
        {FILTER_RATING_OPTIONS.map((filterRatingOption, i) => {
          const isFilterRatingDefault = filterRatingOption === FILTER_RATING_DEFAULT;

          return (
            <Tooltip
              key={`filter-rating-${i}`}
              title={
                <Typography>
                  {isFilterRatingDefault
                    ? `All ratings • ${ratings[i].count}`
                    : `${filterRatingOption} ${filterRatingOption === 1 ? 'star' : 'stars'} • ${ratings[i].count}`}
                </Typography>
              }
              placement="top"
            >
              <Button
                component={Link}
                to={isFilterRatingDefault ? HOME : `${RATING}/${RATING_CARDINALS[filterRatingOption]}`}
                variant={activeRating === filterRatingOption ? 'contained' : 'outlined'}
                value={filterRatingOption}
              >
                {getButtonContent(isFilterRatingDefault, filterRatingOption, theme)}
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Paper>
  );
}
