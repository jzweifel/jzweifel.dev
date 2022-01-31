import { getAllPostIds } from "../lib/posts"

const EXTERNAL_DATA_URL = 'https://jzweifel.dev/posts'

function generateSiteMap(posts: { id: string }[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://jzweifel.dev</loc>
            </url>
            ${posts
                .map(({ id }) => {
                    return `
                        <url>
                            <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
                        </url>
                    `
                })
                .join('')}
        </urlset>
    `
}

function SiteMap() {

}

export async function getServerSideProps({ res }) {
    const posts = getAllPostIds().map(post => ({ id: post.params.id }))
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

export default SiteMap
