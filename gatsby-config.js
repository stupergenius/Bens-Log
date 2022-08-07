module.exports = {
  siteMetadata: {
    title: `Bens Log`,
    author: `BenS`,
    siteUrl: `https://www.bensnider.com`,
    description: "This is where I write my thoughts.",
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.jpg"
    }
  }, "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
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
      path: `${__dirname}/entries_test`,
      name: 'posts',
    },
  }, {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/PrimaryLayout.js`),
    },
  }]
};