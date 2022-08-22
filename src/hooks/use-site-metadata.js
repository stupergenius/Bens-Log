import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          description
          twitterUsername
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}