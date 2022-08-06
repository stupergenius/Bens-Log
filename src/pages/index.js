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
              url={`/posts/${node.id}`}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
              category={node.frontmatter.category}
              excerpt={node.excerpt}
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
          category
          date(formatString: "MMMM DD, YYYY")
          tags
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
