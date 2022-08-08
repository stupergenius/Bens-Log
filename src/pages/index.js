import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import PostPreview from '../components/PostPreview'

export default class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.nodes
    console.table(posts)

    return (
      <div>
        <Bio />
        {posts.map(node => {
          return node && (
            <PostPreview
              key={node.id}
              post={node}
            />
          )
        })}
      </div>
    )
  }
}

export function Head({ data }) {
  return (
    <title>{ data.site.siteMetadata.title }</title>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        fields {
          slug
          url
          tagList
          tags {
            name
            url
          }
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
