import React from "react";
import Link from 'gatsby-link'
import { HeadMeta } from '../components/HeadMeta'
import { graphql } from 'gatsby'
import PageHeader from "../components/layout/PageHeader";
import MainPageContent from "../components/layout/MainPageContent";

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

    return (
      <PageHeader title="The Archives">
        <MainPageContent>
          {Object.entries(groups).map(([key, value]) => {
            return <ArchiveGroup key={key} title={key} posts={value} />
          })}
        </MainPageContent>
      </PageHeader>
    )
  }
}

const ArchiveGroup = ({title, posts}) => {
  return (
    <>
      <h2>{title}</h2>
      {posts.map((node) => (
        <article key={node.id} className="post-item">
          <h3 className="post-item-title">
            <Link to={node.fields.url}>
              {node.frontmatter.title}
            </Link>
          </h3>
        </article>
      ))}
    </>
  )
}

export function Head() {
  return <HeadMeta pageTitle="The Archives" />
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
  }
`
