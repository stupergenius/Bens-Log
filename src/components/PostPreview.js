import React from 'react'
import Link from 'gatsby-link'
import { rhythm } from '../utils/typography'

export default (props) => {
  return (
    <div>
      <h3 style={{ marginBottom: rhythm(1 / 8) }}>
        <Link style={{ boxShadow: 'none' }} to={props.url}>
          {props.title}
        </Link>
      </h3>
      <PostMeta date={props.date} tags={props.tags} />
      
      <p
        style={{
          marginTop: rhythm(1 / 4),
        }}
        dangerouslySetInnerHTML={{__html: props.excerpt}}
      />
    </div>
  )
}

const PostMeta = ({date, tags}) => {
  const tagList = tags.split(',').map(tag => tag.trim())
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <small style={{ marginRight: 'auto' }}>{date}</small>
      {tagList.map(tag => (
        <TagLink key={tag} tag={tag} />
      ))}
    </div>
  )
}

const TagLink = ({tag}) => {
  return (
    <small>
      #
      <Link to={`/tags/${encodeURIComponent(tag)}`}>
        {tag.toLowerCase()}
      </Link>
      &nbsp;
    </small>
  )
}