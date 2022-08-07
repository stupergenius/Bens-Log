import React from "react";
import Link from 'gatsby-link'
import { StaticQuery, graphql } from "gatsby"
import { collectTags } from '../utils/tags'
import { rhythm } from '../utils/typography'

const Tags = ({data}) => {
  const posts = []//data.allMarkdownRemark.edges
  const tags = collectTags(posts)

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.url} style={{ marginBottom: rhythm(1 / 8) }}>
            <Link to={tag.url}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tags

// export const tagQuery = graphql`
//   query TagQuery {
//     allMarkdownRemark {
//       edges {
//         node {
//           id
//           fields {
//             tags {
//               url
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `