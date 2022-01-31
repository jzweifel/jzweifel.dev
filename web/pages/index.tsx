import Head from 'next/head'
import Link from 'next/link'
import groq from 'groq'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import sanityClient from '../lib/sanityClient'

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

export default function Home({ posts }: { 
  posts: {
    publishedAt: string
    slug
    title: string
    _id: string
  }[]
}) {
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
      <section className={utilStyles.headingMd}>
        <p>Hello! I'm Jacob. I'm a software engineer and tech nerd.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.length > 0 && posts.map(({ _id, title = "", slug = "", publishedAt = "" }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href="/posts/[id]" as={`/posts/${slug.current}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={publishedAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
