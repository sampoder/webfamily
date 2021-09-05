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

export default function App({ users, user }) {
  if (user) {
    return <Box dangerouslySetInnerHTML={{ __html: user.htmlContents }}></Box>
  } else {
    return (
      <ThemeProvider theme={theme}>
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
            The NLCS Singapore Webfamily
          </Heading>
          <Heading sx={{ fontWeight: 400 }}>
            A collection of websites made by the students of NLCS Singapore.
          </Heading>
          <Grid
            columns={2}
            sx={{ textAlign: 'left', mt: 3, gap: '6px' }}
            mt={3}
          >
            {users.map(user => (
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
                    mr: 2,
                    border: '1.5px solid white',
                  }}
                />{' '}
                {user.username}
              </Flex>
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
    wildcard != 'nlcs'
      ? wildcard != 'localhost'
        ? wildcard
        : 'sampoder'
      : null
  if (wildcard == null) {
    const users = await getUsers()
    return { props: { users } }
  } else {
    const user = await getUser(wildcard)
    return { props: { user } }
  }
}
