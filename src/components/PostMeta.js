import React from 'react'
import Link from 'gatsby-link'
import { rhythm } from '../utils/typography'

export default ({date, tags}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <small style={{ marginRight: 'auto' }}>{date}</small>
      {tags.map(tag => (
        <TagLink key={tag} tag={tag} />
      ))}
    </div>
  )
}

const TagLink = ({tag}) => {
  return (
    <small>
      #
      <Link to={`/tags/${tag}`}>
        {tag}
      </Link>
      &nbsp;
    </small>
  )
}