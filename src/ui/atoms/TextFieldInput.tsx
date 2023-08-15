'use client'
import { styled, TextField } from '@/src/ui/mui'

export default styled(TextField)(({ theme }) => ({
  height: '100%',
  '.MuiOutlinedInput-root': {
    ...theme.typography.body2,
  },
  '.MuiInputBase-input': {
    padding: '8px 20px',
    fontWeight: 500,
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 1 },
  '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.grey[200] },
  '.MuiInputBase-multiline': {
    padding: 0,
  },
}))
