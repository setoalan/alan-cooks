import * as React from 'react';
import { Link } from 'gatsby';
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

export default function RatingsFilter({ activeRating }) {
  const theme = useTheme();

  const { HOME, RATING } = PATHNAMES;

  const getButtonContent = (isFilterRatingDefault, filterRatingOption) => {
    if (isFilterRatingDefault) {
      return <img src={`https://img.icons8.com/color/24/null/infinity.png`} alt="All ratings" loading="lazy" />;
    }

    return (
      <>
        <Box justifyContent="center" sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
          <Typography>{filterRatingOption} </Typography>
          <Star fontSize="small" sx={{ color: theme.palette.favorite.main }} />
        </Box>
        {[...Array(filterRatingOption)].map((_, i) => (
          <Box
            key={`${filterRatingOption}-star-${i}`}
            justifyContent="center"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Star fontSize="small" sx={{ color: theme.palette.favorite.main }} />
          </Box>
        ))}
      </>
    );
  };

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
                    ? 'All ratings'
                    : `${filterRatingOption} star${filterRatingOption !== 1 ? 's' : ''}`}
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
                {getButtonContent(isFilterRatingDefault, filterRatingOption)}
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Paper>
  );
}
