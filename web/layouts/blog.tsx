import Head from 'next/head'
import { parseISO, format } from 'date-fns'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { useColorMode, Heading, Text, Flex, Stack, Avatar } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import Container from '../components/Container'
import Date from '../components/date'
import { siteTitle } from '../components/layout'
import sanityClient from '../lib/sanityClient'

function urlFor(source: SanityImageSource) {
    return imageUrlBuilder(sanityClient).image(source)
}

export default function BlogLayout({ children, post }) {
    const { colorMode } = useColorMode()
    const textColor = {
        light: 'gray.700',
        dark: 'gray.400'
    }
    const router = useRouter()
    const slug = router.asPath.replace('/posts', '')

    return (
        <Container>
            <Head>
                <title>{post.title}</title>
                <link
                    rel="canonical"
                    href={`https://www.jzweifel.dev/posts/${slug}`}
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
                        <Heading letterSpacing='tight' mb={2} as='h1' size='2xl'>
                            {post.title}
                        </Heading>
                        <Flex
                            justify='space-between'
                            align={['initial', 'center']}
                            direction={['column', 'row']}
                            mt={2}
                            w='100%'
                            mb={4}
                        >
                            <Flex align='center'>
                                <Avatar
                                    size='xs'
                                    name={post.name}
                                    src={urlFor(post.authorImage)
                                        .width(50)
                                        .url()}
                                    mr={2}
                                />
                                <Text fontSize='sm' color={textColor[colorMode]}>
                                    By {post.name} at <Date dateString={post?.publishedAt} />
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    {children}
                </Stack>
        </Container>
    )
}