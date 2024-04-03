import * as React from 'react';
import { Link } from 'gatsby';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { filterRatingOptions, ratingCardinals, FILTER_RATING_DEFAULT } from '../constants';

const { Fragment } = React;

export default function RatingsFilter({ activeRating }) {
  return (
    <Paper square sx={{ mt: 2, px: { xs: 1, md: 2 }, py: 1 }}>
      <ButtonGroup variant="outlined" aria-label="Ratings Filter" fullWidth>
        {filterRatingOptions.map((filterRatingOption, i) => {
          const isFilterRatingDefault = filterRatingOption === FILTER_RATING_DEFAULT;

          return (
            <Tooltip
              title={
                <Typography>
                  {isFilterRatingDefault
                    ? 'All ratings'
                    : `${filterRatingOption} star${filterRatingOption !== 1 ? 's' : ''}`}
                </Typography>
              }
              placement="top"
            >
              <Button
                key={`filter-rating-${i}`}
                component={Link}
                to={isFilterRatingDefault ? '/' : `/rating/${ratingCardinals[filterRatingOption]}`}
                variant={activeRating === filterRatingOption ? 'contained' : 'outlined'}
                value={filterRatingOption}
              >
                {isFilterRatingDefault ? (
                  <img src={`https://img.icons8.com/color/24/null/infinity.png`} alt="All ratings" loading="lazy" />
                ) : (
                  [...Array(filterRatingOption)].map((_, i) => (
                    <Fragment key={`${filterRatingOption}-star-${i}`}>★</Fragment>
                  ))
                )}
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Paper>
  );
}
