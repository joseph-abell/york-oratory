const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const setupData = async (graphql, createPage, type, component) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "${type}" }}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  setupData(graphql, createPage, "news", path.resolve(`./src/templates/news-post.js`));
  setupData(graphql, createPage, "events", path.resolve(`./src/templates/events-post.js`));
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `${node.frontmatter.type}${value}`,
    })
  }
}
