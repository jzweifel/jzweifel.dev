import { Input, Stack, Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import groq from 'groq'

import Container from '../components/Container'
import sanityClient from '../lib/sanityClient'
import Head from 'next/head'
import { siteTitle } from '../components/layout'
import BlogPost from '../components/BlogPost'

export default function Blog({ posts }) {
    return (
        <>
            <Head>
                <title>{siteTitle}</title>
                <link
                rel="canonical"
                href="https://www.jzweifel.dev"
                key="canonical"
                />
            </Head>
            <Container>
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
                        <Heading letterSpacing='tight' mb={2} as='h1' size='2xl'>Blog</Heading>
                        {posts.map((post) => <BlogPost key={post.slug.current} publishedAt={post.publishedAt} slug={post.slug.current} summary={'todo'} title={post.title} />)}
                    </Flex>
                </Stack>
            </Container>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await sanityClient.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
      props: {
        posts
      }
    }
  }
