import { useColorMode, Stack, Flex, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'

import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  const { colorMode } = useColorMode()
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400'
  }

  return (
      
    <Layout home>
       <Head>
         <title>{siteTitle}</title>
         <link
           rel="canonical"
          href="https://www.jzweifel.dev"
          key="canonical"
        />
       </Head>
       <Stack
        as='main'
        spacing={8}
        justifyContent='center'
        alignItems='flex-start'
        m='0 auto 4rem auto'
        maxWidth='700px'
        px={2}
       >
         <Flex
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          maxWidth='700px'
         >
           <Heading mb={2}>Hello! I'm Jacob. I'm a software engineer and tech nerd.</Heading>
           <Text color={colorSecondary[colorMode]}>Lorem ipsum dolor sit amet</Text>
         </Flex>
       </Stack>
    </Layout>
  )
}
