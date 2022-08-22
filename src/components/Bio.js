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
          Hi! 👋 I'm <strong>Ben</strong> and I like to write about technical and nerdy things.
          Historically about Swift and iOS.
          But, I've recently started a masters program in computer science&nbsp;
          <a href="https://omscs.gatech.edu/" target="_blank" rel="noreferrer noopener">
            (Georgia Tech's OMSCS)
          </a>
          , so the content here may pivot as such.
          &nbsp;
          <Link to="/contact">Get @me!</Link>
        </p>
      </div>
    )
  }
}
