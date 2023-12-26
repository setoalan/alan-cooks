import * as React from 'react';
import { navigate } from 'gatsby';
import PaginationMui from '@mui/material/Pagination';

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleChange = (_, value) => navigate(value === 1 ? '/' : `/${base}/${value}`);

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
