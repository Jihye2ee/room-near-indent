import { Button, Stack, Typography } from '@/src/ui/mui'

const DefaultError = ({ reset }: { reset?: () => void }) => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Stack gap={1.5}>
        <Typography variant="h3" color="grey.500">
          페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="body2" color="grey.500">
          주소가 틀렸거나 페이지가 만료되었습니다. 다시 확인해주세요.
        </Typography>
        <Button onClick={reset}>재시도</Button>
      </Stack>
    </Stack>
  )
}

export default DefaultError
