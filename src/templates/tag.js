import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { rhythm } from '../utils/typography'
import PostPreview from '../components/PostPreview'

export default ({data, pathContext}) => {
  const posts = data.allMarkdownRemark.edges
  console.log(posts)
  
  return (
    <div>
      <h2 style={{
        marginBottom: 0,
      }}>
        #{pathContext.tag}
      </h2>
      {posts.map(({ node }) => (
        <PostPreview
          key={node.id}
          url={node.fields.url}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          tags={node.fields.tags}
          category={node.frontmatter.category}
          excerpt={node.excerpt}
        />
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