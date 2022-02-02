import Head from 'next/head'
import React from 'react'

import Container from './Container'
import Link from 'next/link'

const name = 'Jacob Zweifel'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }: {
    children: React.ReactNode
    home?: boolean
}) {    
    return (
        <>
            <Head>
                <link rel="icon" href="/favico.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Container>
                <main>{children}</main>
            </Container>
        </>
    )
}