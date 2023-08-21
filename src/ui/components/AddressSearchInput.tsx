
import { debounce } from 'lodash-es'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { KaKaoAddressItem } from '@/src/data/address/types'
import { Autocomplete, Box, SxProps, Typography } from '@/src/ui/mui'
import { calculateBounds } from '@/src/utils/calculateBounds'
import { Search } from '@mui/icons-material'

import { TextFieldInput } from '../atoms'

type Props = {
  onChange: (value: KaKaoAddressItem) => void
}
const AddressSearchInput = ({ onChange }: Props) => {
  const conditions = useRecoilValue(filterState)
  const [options, setOptions] = useState<KaKaoAddressItem[]>([])
  const handleOnChange = ((value: KaKaoAddressItem | null) => {
    if (!value) return
    const bounds = calculateBounds(Number(value.y), Number(value.x))
    const newValue = { ...value, bounds } as KaKaoAddressItem
    onChange(newValue)
  })

  const handleOnInputChange = debounce((_event, newInputValue: string) => {
    if (!newInputValue) {
      setOptions([])
      return
    }
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch(newInputValue, (result: KaKaoAddressItem[], status: string) => {
      console.log('[주소 검색 결과]:', result, status)
      if (status === 'OK') {
        setOptions(result)
      }
    })
  }, 500
  )

  return (
    <Autocomplete
      id='company-address-search'
      defaultValue={conditions.area}
      onInputChange={handleOnInputChange}
      disablePortal
      disableClearable
      fullWidth
      options={options}
      onChange={(_, value) => handleOnChange(value)}
      noOptionsText='검색 결과가 없습니다'
      popupIcon={<Search sx={{ fontSize: 16 }} />}
      getOptionLabel={(option) => option.address_name}
      isOptionEqualToValue={(option, selected) => option.address_name === selected.address_name}
      renderOption={(props, option) => {
        return (
          <Box component='li' {...props} key={`${props.id}`}>
            <Typography
              variant='body2'
              color='grey.800'
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {option.address_name}
            </Typography>
          </Box>
        )
      }}
      renderInput={(params) => {
        return (
          <TextFieldInput
            {...params}
            placeholder='회사 주소를 입력하세요..'
            fullWidth
          />
        )
      }}
      sx={autoCompleteSx}
    />
  )
}

export default AddressSearchInput

const autoCompleteSx: SxProps = {
  width: '350px',
  ml: 2,
  mt: 1,
  mb: 2,
  borderRadius: '6px',
  background: 'white',
  '.MuiOutlinedInput-root .MuiAutocomplete-input': { p: 0 },
  '.MuiOutlinedInput-root': {
    backgroundColor: 'grey.200',
    height: 42,
    fontSize: 14,
    fontWeight: 600,
    py: 0.625,
    pl: 6,
    color: 'grey.800',
    fieldset: { border: 'none' },
    '.MuiAutocomplete-endAdornment': { left: 16 },
  },
  '.MuiAutocomplete-endAdornment': { top: 'calc(50% - 12px)' },
  '.MuiAutocomplete-popupIndicator': { p: 0, color: 'grey.600' },
  '.MuiAutocomplete-popupIndicatorOpen': { rotate: '-180deg' },
}
