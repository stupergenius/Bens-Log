import React from 'react'
import Link from 'gatsby-link'

export default ({date, tags}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <small style={{ marginRight: 'auto' }}>{date}</small>
      {tags.map(tag => (
        <TagLink key={tag.url} tag={tag} />
      ))}
    </div>
  )
}

const TagLink = ({tag}) => {
  return (
    <small>
      #
      <Link to={tag.url}>
        {tag.name}
      </Link>
      &nbsp;
    </small>
  )
}
