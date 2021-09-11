import {
  Box,
  Grid,
  Container,
  Heading,
  Image,
  Flex,
  Link,
  ThemeProvider,
} from 'theme-ui'
import theme from '../lib/theme'
import NextLink from 'next/link'
export default function App({ users, user, errorCode }) {
  return (
    <ThemeProvider theme={theme}>
      <Flex
        as="main"
        py={4}
        sx={{ textAlign: 'center', color: 'brown', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}
      >
        <Box sx={{pb: '136px'}}>
          <img
            src="https://cloud-ezksrr8rf-hack-club-bot.vercel.app/0boat_large__black_.jpg"
            style={{ height: '100px', marginTop: '32px', marginBottom: '4px' }}
          />
          <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
            404: This Page Wasn't Found
          </Heading>
          <Heading sx={{ fontWeight: 400, mt: 3 }}>
            <Link href="https://nlcs.sampoder.com/">
              Explore all the pages here.
            </Link>
          </Heading>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
