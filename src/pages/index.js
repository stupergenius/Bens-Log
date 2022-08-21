import React from 'react'
import { graphql } from 'gatsby'
import { HeadMeta } from '../components/HeadMeta'
import Bio from '../components/Bio'
import PostPreview from '../components/PostPreview'

export default class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.nodes

    return (
      <>
        <Bio />
        <main aria-label='Content'>
          <h3 className='posts-item-note' aria-label="Recent Posts">Recent Posts</h3>
          {posts.map(node => {
            return node && (
              <PostPreview
                key={node.id}
                post={node}
              />
            )
          })}
        </main>
      </>
    )
  }
}

export const Head = () => (
  <HeadMeta />
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 10, sort: { fields: [frontmatter___date], order: DESC }) {
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
