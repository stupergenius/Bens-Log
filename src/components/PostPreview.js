import React from 'react'
import Link from 'gatsby-link'
import PostMeta from './PostMeta'
import { rhythm } from '../utils/typography'

export default (props) => {
  console.log(props)
  return (
    <div>
      <h3 style={{ marginBottom: rhythm(1 / 8), marginTop: rhythm(1.5) }}>
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
