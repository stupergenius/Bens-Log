import React from 'react'
import { Link } from 'gatsby'

const PostNavigation = ({ previous, next }) => {
  return (
    <nav className="post-nav">
      {previous && (
        <Link className="post-nav-item post-nav-prev" to={previous.fields.url} rel="prev">
          <div className="nav-arrow">Previous</div>
          <span className="post-title">
            ← {previous.frontmatter.title}
          </span>
        </Link>
      )}

      {next && (
        <Link className="post-nav-item post-nav-next" to={next.fields.url} rel="next">
          <div className="nav-arrow">Next</div>
          <span className="post-title">
            {next.frontmatter.title} →
          </span>
        </Link>
      )}
    </nav>
  )
}

export default PostNavigation