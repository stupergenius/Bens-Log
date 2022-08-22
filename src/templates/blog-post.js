import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import PostNavigation from '../components/PostNavigation'
import MainPageContent from '../components/layout/MainPageContent'
import { HeadMeta } from '../components/HeadMeta'
import PostMeta from '../components/PostMeta'
import Bio from '../components/Bio'

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <>
      <MainPageContent>
        <article itemScope itemType="https://schema.org/BlogPosting">
          <PostMeta
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            rawDate={post.frontmatter.rawDate}
            tags={post.fields.tags}
            excerpt={post.excerpt} />

          <div className="page-content" itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: post.html }} />

          <PostNavigation next={next} previous={previous} />
        </article>
        <Bio />
      </MainPageContent>
    </>
  )
}

export default BlogPostTemplate

export function Head({ data }) {
  return <HeadMeta pageTitle={data.markdownRemark.frontmatter.title} />
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        tags {
          name
          url
        }
      }
      frontmatter {
        title
        date:date(formatString: "MMMM DD, YYYY")
        rawDate:date
      }
    }
  }
`
