import * as React from 'react';
import { navigate } from 'gatsby';
import PaginationMui from '@mui/material/Pagination';

export default function Pagination({ totalCount, pageSize, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleChange = (_, value) => navigate(value === 1 ? `/${base}` : `/${base}page/${value}`);

  return (
    <PaginationMui
      sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}
      variant="outlined"
      size="large"
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
    />
  );
}
