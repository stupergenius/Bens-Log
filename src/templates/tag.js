import React from 'react'
import { graphql } from 'gatsby'
import PageHeader from '../components/layout/PageHeader'
import MainPageContent from '../components/layout/MainPageContent'
import PostPreview from '../components/PostPreview'

const Tag = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <PageHeader title={`Posts tagged with #${pageContext.tag}`} />
      <MainPageContent>
        {posts.map(({ node }) => (
          <PostPreview
            key={node.id}
            post={node}
          />
        ))}
      </MainPageContent>
    </>
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
