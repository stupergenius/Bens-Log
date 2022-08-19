import React from 'react'
import { rhythm } from '../utils/typography'

export default ({style}) => (
  <img
    src="https://www.gravatar.com/avatar/94a30535d38606170f571898d96b6181?s=240"
    alt="Ben Snider"
    className="author-avatar"
    style={{
      width: rhythm(5),
      height: rhythm(5)
    }}
  />
)