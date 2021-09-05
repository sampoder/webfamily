import { Box, Grid, Container, Heading, Image, Flex, Link } from 'theme-ui'
import { getUser } from './api/[slug]'

export default function App({ user }) {
  return <Box dangerouslySetInnerHTML={{ __html: user.htmlContents }}></Box>
}

export async function getServerSideProps(ctx) {
  const user = await getUser(ctx.params.slug)
  return { props: { user } }
}
