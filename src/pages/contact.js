import React from 'react'
import { graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

const Contact = () => (
  <div>
    <h2>Contact</h2>

    <p>Feel free to get at me at one of the following sites::</p>
    <ul>
      <CI><a href="https://twitter.com/benatbensnider">Twitter</a></CI>
      <CI><a href="https://github.com/stupergenius">GitHub</a></CI>
      <CI><a href="https://www.linkedin.com/in/bensnider">LinkedIn</a></CI>
      <CI><a href="https://stackoverflow.com/users/265648/bensnider">Stack Overflow</a></CI>
      <CI><a href="https://coderwall.com/bensnider">Coderwall</a></CI>
    </ul>
  </div>
)

const CI = ({children}) => (
  <li style={{ marginBottom: rhythm(1 / 8) }}>
    {children}
  </li>
)

export default Contact

export function Head({ data }) {
  return (
    <title>{`Contact | ${data.site.siteMetadata.title}`}</title>
  )
}

export const pageQuery = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
