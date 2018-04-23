import React from 'react'
import Link from 'gatsby-link'
import ProfilePic from './ProfilePic'
import { rhythm } from '../utils/typography'

export default class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1),
        }}
      >
        <ProfilePic />
        <p>
          Hi! 👋 I'm <strong>Ben Snider</strong> and I like to write about technical and nerdy things. Mostly about Swift and iOS, dabbling in machine learning and open source development.{' '}
          <Link to="/contact">Get @me!</Link>
        </p>
      </div>
    )
  }
}
