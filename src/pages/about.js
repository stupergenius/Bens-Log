import React from "react";
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import ProfilePic from '../components/ProfilePic'

const About = () => (
  <div>
    <h2>About Me</h2>
    <div style={{ display: 'flex' }}>
      <ProfilePic style={{ marginTop: rhythm(0.5) }} />
      <p>I'm an iOS developer by trade, and otherwise identify as a husband, cyclist, vegan and nerd. Technology is my life, and mobile technology is where I choose to direct my focus. Mobile technology is how the world interacts, and so being at the forefront of this trend is equal parts challenging and rewarding.</p>
    </div>
    <p>I'm not currently looking for work, but I always <Link to="/contact">welcome connections</Link>.</p>
  </div>
)

export default About

export function Head({ data }) {
  return (
    <title>{`About Me | ${data.site.siteMetadata.title}`}</title>
  )
}

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`