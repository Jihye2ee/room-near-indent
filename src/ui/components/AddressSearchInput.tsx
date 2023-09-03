
import { debounce } from 'lodash-es'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { getKakaoAddressSearch, getKakaoKeywordSearch } from '@/src/data/local/queries'
import { KakaoItem } from '@/src/data/local/types'
import { Autocomplete, Box, SxProps, Typography } from '@/src/ui/mui'
import { calculateBounds } from '@/src/utils/calculateBounds'
import { Search } from '@mui/icons-material'

import { TextFieldInput } from '../atoms'

type Props = {
  onChange: (value: KakaoItem) => void
}
const AddressSearchInput = ({ onChange }: Props) => {
  const conditions = useRecoilValue(filterState)
  const [options, setOptions] = useState<KakaoItem[]>([])
  const handleOnChange = ((value: KakaoItem | null) => {
    if (!value) return
    const bounds = calculateBounds(conditions.distance ?? 2, Number(value.y), Number(value.x))
    const newValue = { ...value, bounds } as KakaoItem
    onChange(newValue)
  })

  const handleOnInputChange = debounce(async (_event, newInputValue: string) => {
    if (!newInputValue) {
      setOptions([])
      return
    }

    getKakaoAddressSearch(newInputValue).then(async ({ documents }: { documents: KakaoItem[] }) => {
      if (documents.length === 0) {
        getKakaoKeywordSearch({ query: newInputValue }).then(({ documents }: { documents: KakaoItem[] }) => {
          setOptions(documents)
        })
      } else {
        setOptions(documents)
      }
    })
  }, 500)

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
      getOptionLabel={(option) => 'place_name' in option ? option.place_name : option.address_name}
      isOptionEqualToValue={(option, value) => 'id' in option && 'id' in value ? option.id === value.id : option.x === value.x && option.y === value.y}
      renderOption={(props, option) => {
        return (
          <Box component='li' {...props} key={`${props.id}`}>
            <Typography
              variant='body2'
              color='grey.800'
              sx={addressSxProps}
            >
              {'place_name' in option ? option.place_name : option.address_name}
            </Typography>
          </Box>
        )
      }}
      renderInput={(params) => {
        return (
          <TextFieldInput
            {...params}
            placeholder='지역, 지하철역, 회사명을 검색해주세요'
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
  width: '100%',
  mt: 1,
  mb: 1,
  borderRadius: '6px',
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

const addressSxProps: SxProps = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}
