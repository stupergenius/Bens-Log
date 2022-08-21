const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions  }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
  const tagTemplate = path.resolve('./src/templates/tag.js')

  return graphql(`
    query AllPosts {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
              url
              tags {
                name
                url
              }
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    createPostPages(createPage, blogPostTemplate, posts)

    // Create tag pages.
    createTagPages(createPage, tagTemplate, posts)
  })
}

exports.onCreateNode = ({ node, actions , getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = slugify(node.frontmatter.title)
    const url = `/posts/${slug}/`
    const tags = createTagList(node.frontmatter.tags)

    createNodeField({
      node,
      name: 'tagList',
      value: tags.map(tag => tag.name)
    })

    createNodeField({
      node,
      name: 'tags',
      value: tags,
    })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    createNodeField({
      node,
      name: 'url',
      value: url,
    })
  }
}

function createPostPages(createPage, template, posts) {
  _.each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const fields = post.node.fields

    createPage({
      path: fields.url,
      component: template,
      context: {
        ...fields,
        isPost: true,
        previous,
        next,
      },
    })
  })
}

function collectTags(posts) {
  let allTags = posts.map(post => post.node.fields.tags)
  return _.uniqWith(_.flatten(allTags), (a, b) => {
    return a.url === b.url
  })
}

function createTagPages(createPage, template, posts) {
  const uniqueTags = collectTags(posts)
  _.each(uniqueTags, tag => {
    createPage({
      path: tag.url,
      isTag: true,
      component: template,
      context: { tag: tag.name },
    })
  })
}

function slugify(title) {
  // This is a lodash impl of pelican's `slugify` method:
  // https://github.com/getpelican/pelican/blob/5ca1cabe78b9a67b56fdb7197861861ecc83fdec/pelican/utils.py#L266
  return _.chain(title)
    .toLower()
    .deburr()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-')
    .value()
}

function createTagList(tags) {
  if (!tags) return []

  const tagList = Array.isArray(tags)
    ? tags
    : tags.trim().split(',')

  return tagList.map(tag => {
    tag = tag.trim()
    return {
      url: `/tags/${slugify(tag)}/`,
      name: tag,
    }
  })
}
