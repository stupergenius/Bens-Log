import React from 'react'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from "gatsby"
import * as style from './PrimaryLayout.module.css'
import { rhythm } from '../utils/typography'

const ListLink = ({to, children}) => (
  <li style={{ display: 'inline-block', marginLeft: '1rem' }}>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

const SiteTitle = ({title}) => (
  <Link to="/" style={{
    textShadow: 'none',
    backgroundImage: 'none',
  }}>
    <h1 style={{ display: 'inline' }}>
      {title}
    </h1>
  </Link>
)

const SiteHeader = ({title}) => (
  <header
    style={{ marginTop: 0, marginBottom: '1.5rem' }}>
    <ul className={style.navigation}>
      <li style={{marginRight: 'auto'}}>
        <SiteTitle title={title} />
      </li>
      <ul className={style.navigation}>
        <ListLink to="/archives">Archives</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>
      </ul>
    </ul>
  </header>
)

const PrimaryLayout = ({children}) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div
        style={{
          maxWidth: rhythm(24),
          margin: `${rhythm(1.5)} auto`,
          padding: `0 ${rhythm(1)} ${rhythm(0.5)} ${rhythm(1)}`,
        }}
      >
        <SiteHeader title={data.site.siteMetadata.title} />
        {children}
      </div>
    )}
  />
)

export default PrimaryLayout
