const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const setupPage = async (graphql, createPage, component) => {
  const result = await graphql(
    `
    {
      pages: allMarkdownRemark(
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
  );

  if (result.errors) {
    throw result.errors
  }

  const pages = result.data.pages.edges.map(p => p.node);

  console.log("pages", pages);
}

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
  );

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post) => {
    if (post.node.frontmatter.type === "hidden") return;

    if (!post.node.frontmatter.type) {
      return createPage({
        path: post.node.fields.slug,
        component,
        context: {
          slug: post.node.fields.slug,
        },
      })
    }

    const filteredPosts = posts.filter(p => post.node.frontmatter.type === p.node.frontmatter.type);
    const filteredIndex = filteredPosts.findIndex(p => p.node.frontmatter.title === post.node.frontmatter.title);
    const previous = filteredIndex === filteredPosts.length - 1 ? null : filteredPosts[filteredIndex + 1].node
    const next = filteredIndex === 0 ? null : filteredPosts[filteredIndex - 1].node;

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
  setupPage(graphql, createPage, path.resolve(`./src/templates/page.js`));
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    if (node.frontmatter.type) {
      createNodeField({
        name: `slug`,
        node,
        value: `${node.frontmatter.type}${value}`,
      })
    }
    else {
      createNodeField({
        name: `slug`,
        node,
        value: `${value}`,
      })
    }
  }
}
