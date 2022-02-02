import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import { Box } from '@chakra-ui/react'
import BlogLayout from '../../layouts/blog'
import sanityClient from '../../lib/sanityClient'


const serializers = {
    list: (props) => (<Box as='ul' pt={2} pl={5} ml={2} {...props} />),
    listItem: (props) => (<Box as='li' pb={1} {...props} />),
    hardBreak: (props) => (<Box height='24px' {...props} />)
}

export default function Post({ post }: {
    post: {
        body: []
    }
}) {
    const { body = [] } = post
    return (
        <BlogLayout post={post}>
            <BlockContent
                blocks={body}
                serializers={serializers}
                imageOptions={{ w: 320, h: 240, fit: 'max' }}
                {...sanityClient.config()}
            />
        </BlogLayout>
    )
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(
        `*[_type == "post" && defined(slug.current)][].slug.current`
    )
    return {
        paths: paths.map((slug: string) => ({ params: { id: slug }})),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { id = "" } = params
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        "name": author->name,
        "categories": categories[]->title,
        "authorImage": author->image,
        body,
        publishedAt
    }`
    const post = await sanityClient.fetch(query, { slug: id })
    return {
        props: {
            post
        }
    }
}
