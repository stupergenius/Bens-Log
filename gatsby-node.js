const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tag.js')
    
    resolve(
      graphql(
        `
          {
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
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        createPostPages(createPage, blogPostTemplate, posts)
        
        // Create tag pages.
        createTagPages(createPage, tagTemplate, posts)
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const slug = '/' + slugify(node.frontmatter.title)
    const url = slug + '.html'
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

    createPage({
      path: post.node.fields.url,
      component: template,
      context: {
        ...post.node.fields,
        previous,
        next,
      },
    })
  })
}

function createTagPages(createPage, template, posts) {
  const uniqueTags = collectTags(posts)
  for (let tag of uniqueTags) {
    createPage({
      path: tag.url,
      component: template,
      context: {
        tag: tag.name
      },
    })
  }
}

function collectTags(posts) {
  let allTags = posts.map(post => post.node.fields.tags)
  return _.uniqWith(_.flatten(allTags), (a, b) => {
    return a.url === b.url
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
  if (!tags || tags.trim().length === 0) {
    return []
  }
  return tags.split(',').map(tag => {
    tag = tag.trim()
    return {
      url: `/tag/${encodeURIComponent(tag)}/`,
      name: tag,
    }
  })
}
