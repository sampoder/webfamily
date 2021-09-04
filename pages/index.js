import { Box, Grid, Container, Heading, Image, Flex, Link } from 'theme-ui'

export default function App() {
  return (
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
      <Grid columns={2} sx={{ textAlign: 'left', mt: 3 }} mt={3}>
        <Flex
          sx={{
            bg: 'brown',
            py: 2,
            px: '10px',
            borderRadius: 8,
            color: 'white',
            fontWeight: 600,
            alignItems: 'center',
          }}
        >
          <Image
            src="https://github.com/sampoder.png"
            sx={{
              borderRadius: 8,
              height: '24px',
              mr: 2,
              border: '1.5px solid white',
            }}
          />{' '}
          sampoder
        </Flex>
        <Flex
          sx={{
            bg: 'brown',
            py: 2,
            px: '10px',
            borderRadius: 8,
            color: 'white',
            fontWeight: 600,
            alignItems: 'center',
          }}
        >
          <Image
            src="https://github.com/sampoder.png"
            sx={{
              borderRadius: 8,
              height: '24px',
              mr: 2,
              border: '1.5px solid white',
            }}
          />{' '}
          sampoder
        </Flex>
      </Grid>
      <Box sx={{ mt: 3 }}>
        Built by <Link href="https://github.com/sampoder">@sampoder</Link>, open
        sourced <Link href="https://github.com/sampoder/webfamily">here</Link>.
      </Box>
    </Container>
  )
}
