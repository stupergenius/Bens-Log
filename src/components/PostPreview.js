import React from 'react'
import Link from 'gatsby-link'
import { rhythm } from '../utils/typography'

export default (props) => {
  return (
    <div className='post-preview'>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: 'none' }} to={props.url}>
          {props.title}
        </Link>
      </h3>
      <small>{props.date}</small><br/>7
      <TagList tags={props.tags} />
      <small>{props.category}</small>
      
      <p dangerouslySetInnerHTML={{__html: props.excerpt}} />
    </div>
  )
}

function TagList({tags}) {
  return (
    <small>
      
    </small>
  )
}