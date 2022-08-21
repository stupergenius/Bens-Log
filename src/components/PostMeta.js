import React from 'react'
import Link from 'gatsby-link'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default ({ title, date, rawDate, tags, excerpt }) => {
  return (
    <header className="header">
      <TagSpan tags={tags} />
      <h1 className="header-title" itemProp="headline">{title}</h1>
      <Meta date={date} rawDate={rawDate} excerpt={excerpt} />
    </header>
  )
}

const TagSpan = ({tags}) => {
  if (tags == null || tags.length === 0) {
    return null
  }

  return (
    <div className="tags">
      <span itemProp="keywords">
        {tags.map(tag => (
          <TagLink key={tag.url} tag={tag} />
        ))}
      </span>
    </div>
  )
}

const Meta = ({ date, rawDate, excerpt }) => {
  const { author } = useSiteMetadata()

  return (
    <div className="post-meta">
      <time dateTime={rawDate} itemProp="datePublished">
        {date}
      </time>
      <span itemProp="author" itemScope itemType="https://schema.org/Person">
        <span itemProp="name">{author}</span>
      </span>
      <span hidden itemProp="publisher" itemType="Person">{author}</span>
      {/* <span hidden itemProp="image">{{ page.image }}</span> */}
      <span hidden itemProp="mainEntityOfPage">{excerpt}</span>
    </div>
  )
}

const TagLink = ({tag}) => {
  return (
    <>
      <Link className="tag" to={tag.url}>
        #{tag.name}
      </Link>
      &nbsp;
    </>
  )
}
