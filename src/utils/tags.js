const _ = require('lodash')

export const collectTags = (posts) => {
  let allTags = posts.map(post => post.node.fields.tags)
  return _.uniqWith(_.flatten(allTags), (a, b) => {
    return a.url === b.url
  })
}