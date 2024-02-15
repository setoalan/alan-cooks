import * as React from 'react';
import { Link } from 'gatsby';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';

const { Fragment } = React;

const filterRatingsOptions = ['ALL', 5, 4, 3, 2, 1];
export const [DEFAULT_FILTER_RATING] = filterRatingsOptions;

export default function RatingsFilter({ activeRating }) {
  return (
    <Paper sx={{ paddingX: 2, paddingY: 1 }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
        {filterRatingsOptions.map((filterRatingOption, i) => (
          <Button
            key={`filter-rating-${i}`}
            component={Link}
            to={filterRatingOption === DEFAULT_FILTER_RATING ? '/' : `/rating/${filterRatingOption}`}
            variant={activeRating === filterRatingOption ? 'contained' : 'outlined'}
            value={filterRatingOption}
          >
            {filterRatingOption === DEFAULT_FILTER_RATING
              ? filterRatingOption
              : [...Array(filterRatingOption)].map((_, i) => (
                  <Fragment key={`${filterRatingOption}-star-${i}`}>★</Fragment>
                ))}
          </Button>
        ))}
      </ButtonGroup>
    </Paper>
  );
}
