'use client'
import { Button, ButtonProps, styled } from '@mui/material'

export default styled(({ variant = 'contained', size, ...props }: ButtonProps) => (
  <Button size={size} variant={variant} {...props} />
))(({ theme: { palette } }) => ({
  borderRadius: 6,
  width: 166,
  height: 40,
  fontWeight: 500,
  fontSize: 15,
  lineHeight: 1.6,
  textAlign: 'center',
  boxShadow: 'none',
  '&.MuiButton-containedPrimary': {
    ':hover': {
      backgroundColor: palette.primary,
      boxShadow: 'none',
    },
    ':disabled': {
      color: 'var(--text-color)',
      backgroundColor: palette.grey[300],
    },
  },
  '&.MuiButton-outlinedPrimary': {
    color: palette.grey[900],
    borderColor: palette.grey[200],
    backgroundColor: '#ffffff',
    ':hover': {
      backgroundColor: palette.grey[50],
    },
  },
  '&.MuiButton-text': {
    color: palette.grey[500],
    ':hover': {
      backgroundColor: palette.grey[50],
    },
  },
  '&.MuiButton-sizeSmall': {
    width: 52,
    height: 32,
    fontSize: 12,
  },
}))
