import Head from 'next/head'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import Layout from "../../components/layout"
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import sanityClient from '../../lib/sanityClient'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

function urlFor(source: SanityImageSource) {
    return imageUrlBuilder(sanityClient).image(source)
}

export default function Post({ post }: {
    post: {
        slug: {
            current: string
        }
        name: string
        categories: string[],
        authorImage: SanityImageSource
        title: string
        body: []
        publishedAt: string
    }
}) {
    const { title = "Missing title", name = "Missing name", categories, authorImage, slug, body = [] } = post
    return (
        <Layout>
            <Head>
                <title>{title}</title>
                <link
                    rel="canonical"
                    href={`https://www.jzweifel.dev/posts/${slug?.current}`}
                    key="canonical"
                />
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <span>By {name}</span>
                {categories && (
                    <ul>
                        Posted in
                        {categories.map((category) => <li key={category}>{category}</li>)}
                    </ul>
                )}
                {authorImage && (
                    <div>
                        <img
                            src={urlFor(authorImage)
                                .width(50)
                                .url()}
                        />
                    </div>
                )}
                <div className={utilStyles.lightText}>
                    <Date dateString={post?.publishedAt} />
                </div>
                <BlockContent
                    blocks={body}
                    imageOptions={{ w: 320, h: 240, fit: 'max' }}
                    {...sanityClient.config()}
                />
            </article>
        </Layout>
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
