import sanityClient from '@sanity/client'

export default sanityClient({
    apiVersion: '2021-08-31',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true
})
