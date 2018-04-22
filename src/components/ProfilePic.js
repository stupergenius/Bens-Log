import React from 'react'
import { rhythm } from '../utils/typography'

export default ({style}) => (
  <img
    src="https://www.gravatar.com/avatar/94a30535d38606170f571898d96b6181?s=240"
    alt={`Ben Snider`}
    style={{
      ...style,
      marginRight: rhythm(1 / 2),
      marginBottom: 0,
      width: rhythm(3),
      height: rhythm(3),
      clipPath: "circle(50%)"
    }}
  />
)