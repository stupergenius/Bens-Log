import React from "react";
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

export default class Archives extends React.Component {

  groupKey(date) {
    const yearMonth = date.split('-').splice(0, 2)
    const d = new Date(`${yearMonth[1]}/1/${yearMonth[0]}`)
    const key = d.toLocaleString('en-us', { month: 'long', year: 'numeric' })
    return key
  }

  groups() {
    const posts = this.props.data
    let grouped = posts.allMarkdownRemark.edges.reduce((groups, {node}) => {
      const groupKey = this.groupKey(node.frontmatter.date)

      let group = groups[groupKey] || []
      group.push(node)
      groups[groupKey] = group

      return groups
    }, {})
    return grouped
  }

  render() {
    const groups = this.groups()
    console.log(groups)

    return (
      <div>
        <h2>Archives</h2>

        {Object.entries(groups).map(([key, value]) => {
          console.log(key, value)
          return <ArchiveGroup key={key} title={key} posts={value} />
        })}
      </div>
    )
  }
}

const ArchiveGroup = ({title, posts}) => {
  console.log(title, posts)

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {posts.map((node) => (
          <li key={node.id}>
            <Link to={node.fields.url}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Head({ data }) {
  return (
    <title>{`Archives | ${data.site.siteMetadata.title}`}</title>
  )
}

export const archiveQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          fields {
            slug
            url
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
