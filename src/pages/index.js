import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import PostPreview from '../components/PostPreview'
import { rhythm } from '../utils/typography'

export default class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <div>
        <Helmet title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => {
          return (
            <PostPreview
              key={node.id}
              url={node.fields.url}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              tags={node.fields.tags}
              category={node.frontmatter.category}
              excerpt={node.excerpt}
            />
          )
        })}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
