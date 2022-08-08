import React from 'react'
import { graphql } from 'gatsby'
import PostPreview from '../components/PostPreview'

const Tag = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges
  console.log(posts)
  console.log(pageContext)

  return (
    <div>
      <h2 style={{
        marginBottom: 0,
      }}>
        #{pageContext.tag}
      </h2>
      {posts.map(({ node }) => (
        <PostPreview
          key={node.id}
          post={node}
        />
      ))}
    </div>
  )
}

export default Tag

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
