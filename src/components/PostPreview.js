import React from 'react'
import Link from 'gatsby-link'

const PostPreview = ({ post }) => {
  return (
    <article className="post-item">
      <span className="post-item-date">{post.frontmatter.date}</span>
      <h4 className="post-item-title">
        <Link to={post.fields.url}>
          {post.frontmatter.title}
        </Link>
      </h4>
    </article>
  )
}

export default PostPreview