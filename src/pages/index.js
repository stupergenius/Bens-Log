import React from 'react'
import { graphql } from 'gatsby'
import { HeadMeta } from '../components/HeadMeta'
import Bio from '../components/Bio'
import PostPreview from '../components/PostPreview'

export default class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.nodes

    return (
      <div>
        <Bio />

        <h3 className='posts-item-note' aria-label="Recent Posts">Recent Posts</h3>
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

export const Head = ({ data }) => (
  <HeadMeta />
)

export const pageQuery = graphql`
  query IndexQuery {
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
