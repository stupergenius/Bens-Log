module.exports = {
  siteMetadata: {
    title: `Bens Log`,
    author: `Benjamin Snider`,
    siteUrl: `https://www.bensnider.com`,
    image: `https://www.gravatar.com/avatar/94a30535d38606170f571898d96b6181?s=240`,
    description: "This is where I write my thoughts.",
    twitterUsername: "@benatbensnider",
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.jpg"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    }
  }, {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/entries`,
      name: 'posts',
    },
  }, {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/layout/PrimaryLayout.js`),
    },
  }, {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map(node => {
              const url = `${site.siteMetadata.siteUrl}/posts/${node.fields.slug}/`
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url,
                guid: url,
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: "/feeds/all.atom.xml",
          title: "Bens Log",
          match: "^/posts/",
        },
      ],
    },
  }, {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: "language-",
            inlineCodeMarker: `›`,
            aliases: {sh: 'bash'},
            showLineNumbers: false,
            noInlineHighlight: false,
            prompt: {
              user: "ben",
              host: "host",
              global: false,
            },
            escapeEntities: {},
          },
        },
      ],
    },
  }, {
      resolve: `gatsby-plugin-client-side-redirect`,
  }]
};