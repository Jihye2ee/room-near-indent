'use client'

import { styled, ToggleButton } from '@mui/material'

export default styled(ToggleButton)(({ theme }) => ({
  width: 90,
  height: 40,
  borderRadius: '6px',
  marginLeft: 'unset !important',
  border: `1px solid ${theme.palette.grey[500]}`,
  textTransform: 'unset',
  ':hover': {
    backgroundColor: theme.palette.grey[400],
  },
  '&.Mui-selected': {
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[400],
    borderLeft: `1px solid ${theme.palette.grey[400]} !important`,
    ':hover': {
      backgroundColor: theme.palette.grey[400],
    },
    '& p': {
      color: theme.palette.grey[800],
    },
  },
}))
