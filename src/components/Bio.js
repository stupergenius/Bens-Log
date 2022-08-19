import React from 'react'
import Link from 'gatsby-link'
import ProfilePic from './ProfilePic'

export default class Bio extends React.Component {
  render() {
    return (
      <div className="author">
        <ProfilePic />
        <h2 className="author-name">Benjamin Snider</h2>
        <p className="author-bio">
          Hi! 👋 I'm <strong>Ben</strong> and I like to write about technical and nerdy things. Mostly about Swift and iOS, dabbling in machine learning and open source development.{' '}
          <Link to="/contact">Get @me!</Link>
        </p>
      </div>
    )
  }
}
