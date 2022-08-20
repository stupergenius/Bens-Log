import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import PostMeta from '../components/PostMeta'
import Bio from '../components/Bio'

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <PostMeta
          date={post.frontmatter.date}
          tags={post.fields.tags} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.url} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.url} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export function Head({ data }) {
  return (
    <title>{`${data.markdownRemark.frontmatter.title} | ${data.site.siteMetadata.title}`}</title>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tags {
          name
          url
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

// export const pageQuery = graphql`
//   query BlogPostBySlug {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//   }
// `
