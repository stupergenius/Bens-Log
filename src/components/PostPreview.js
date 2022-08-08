import React from 'react'
import Link from 'gatsby-link'
import PostMeta from './PostMeta'
import { rhythm } from '../utils/typography'

const PostPreview = ({ post }) => {
  return (
    <div>
      <h3 style={{ marginBottom: rhythm(1 / 8), marginTop: rhythm(1.5) }}>
        <Link style={{ boxShadow: 'none' }} to={post.fields.url}>
          {post.frontmatter.title}
        </Link>
      </h3>
      <PostMeta date={post.frontmatter.date} tags={post.fields.tags} />

      <p
        style={{
          marginTop: rhythm(1 / 4),
        }}
        dangerouslySetInnerHTML={{__html: post.excerpt}}
      />
    </div>
  )
}

export default PostPreview