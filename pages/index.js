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
import { getUsers } from './api/list'
import { getUser } from './api/[slug]'
import theme from '../lib/theme'
import NextLink from 'next/link'
import FourOhFour from './404'
import Meta from '../components/meta'

export default function App({ users, user, errorCode }) {
  if (errorCode) {
    return <FourOhFour />
  }
  if (user) {
    let strippedTheme = theme
    strippedTheme.fonts = { themed: `'EB Garamond'` }
    strippedTheme.colors.background = null
    strippedTheme.colors.text = '#000'
    return (
      <div>
        <iframe
          srcDoc={`${user.htmlContents}`}
          style={{
            border: 'none',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
          frameBorder="0"
          scrolling="yes" 
          seamless="seamless"
          height="100%"
          width="100%"
        />
        <ThemeProvider theme={strippedTheme}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 3,
              left: 3,
              fontFamily: 'themed',
              bg: 'brown',
              color: 'white',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 4,
              width: '40px',
              height: '40px',
              borderRadius: 999,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '3px',
              cursor: 'pointer',
            }}
            onClick={() => {
              alert(
                [
                  `This is student generated content created during a`,
                  `workshop in school, the workshops created have been brought`,
                  `together to make an explorable collection.`,
                ].join(' '),
              )
            }}
          >
            i
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 3,
              right: 3,
              fontFamily: 'themed',
              bg: 'brown',
              color: 'white',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 4,
              width: '100px',
              height: '40px',
              borderRadius: 999,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link href={`/api/back/${user.username}`}>
              <Box
                sx={{
                  '&:hover': { bg: 'blue' },
                  height: '40px',
                  width: '50px',
                  borderTopLeftRadius: 999,
                  borderBottomLeftRadius: 999,
                  paddingBottom: '6px',
                  alignItems: 'center',
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'flex-end',
                  paddingRight: '4px',
                }}
              >
                ←
              </Box>
            </Link>
            <Link href={`/api/next/${user.username}`}>
              <Box
                sx={{
                  '&:hover': { bg: 'blue' },
                  height: '40px',
                  width: '50px',
                  borderTopRightRadius: 999,
                  borderBottomRightRadius: 999,
                  paddingBottom: '6px',
                  alignItems: 'center',
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'flex-start',
                  paddingLeft: '4px',
                }}
              >
                →
              </Box>
            </Link>
          </Box>
        </ThemeProvider>
      </div>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Meta />
        <Container
          as="main"
          py={4}
          variant="copy"
          sx={{ textAlign: 'center', color: 'brown' }}
        >
          <img
            src="https://cloud-ezksrr8rf-hack-club-bot.vercel.app/0boat_large__black_.jpg"
            style={{ height: '100px', marginTop: '32px', marginBottom: '-8px' }}
          />
          <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
            The NLCS (Singapore) Webfamily
          </Heading>
          <Heading sx={{ fontWeight: 400 }}>
            A collection of websites made by the students of NLCS (Singapore).
          </Heading>
          <Grid
            columns={2}
            sx={{ textAlign: 'left', mt: 3, gap: '6px' }}
            mt={3}
          >
            {users.map(user => (
              <NextLink
                href={`https://${user.username}.thenlcssg.family`}
                key={user.username}
              >
                <Flex
                  sx={{
                    bg: 'brown',
                    py: 2,
                    px: '10px',
                    borderRadius: 8,
                    color: 'white',
                    fontWeight: 600,
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bg: 'blue',
                    },
                  }}
                >
                  <Image
                    src={user.avatar[0].url}
                    sx={{
                      borderRadius: 8,
                      height: '24px',
                      width: '24px',
                      objectFit: 'cover',
                      mr: 2,
                      border: '1.5px solid white',
                    }}
                  />{' '}
                  {user.username}
                </Flex>
              </NextLink>
            ))}
          </Grid>
          <Box sx={{ mt: 3 }}>
            Built by <Link href="https://github.com/sampoder">@sampoder</Link>,
            open sourced{' '}
            <Link href="https://github.com/sampoder/webfamily">here</Link>.
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
}

export async function getServerSideProps(ctx) {
  let wildcard = ctx.req.headers.host.split('.')[0]
  wildcard =
    (wildcard != 'thenlcssg' && wildcard != 'webfamily')
      ? wildcard != 'localhost'
        ? wildcard
        : 'sampoder'
      : null
  if (wildcard == null) {
    const users = await getUsers()
    return { props: { users } }
  } else {
    try {
      const user = await getUser(wildcard)
      if (user.htmlContents) {
        return { props: { user } }
      } else {
        return { props: { errorCode: 404 } }
      }
    } catch {
      return { props: { errorCode: 404 } }
    }
  }
}
