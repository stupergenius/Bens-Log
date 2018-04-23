import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

export default ({data}) => {
  const posts = data.allMarkdownRemark.edges
  console.log(posts)
  
  return (
    <div>
      {posts.map(({ node }) => (
        <p key={node.id}>{node.frontmatter.title}</p>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      limit: 1000,
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {fields: {tagList: {in: [$tag]}}}) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
            url
            tags {
              name
              url
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            category
          }
        }
      }
    }
  }
`