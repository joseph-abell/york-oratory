const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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
              type
            }
          }
        }
      }
    }
  `
	);

	if (result.errors) {
		throw result.errors;
	}

	result.data.pages.edges.forEach((page) => {
		if (page.node.frontmatter.type !== '/hidden/') {
			createPage({
				path: page.node.fields.slug,
				component,
				context: {
					slug: page.node.fields.slug
				}
			});
		}
	});
};

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
              type
            }
          }
        }
      }
    }
  `
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const posts = result.data.allMarkdownRemark.edges;

	posts.forEach((post) => {
		const filteredPosts = posts.filter((p) => post.node.frontmatter.type === p.node.frontmatter.type);
		const filteredIndex = filteredPosts.findIndex((p) => p.node.frontmatter.title === post.node.frontmatter.title);
		const previous = filteredIndex === filteredPosts.length - 1 ? null : filteredPosts[filteredIndex + 1].node;
		const next = filteredIndex === 0 ? null : filteredPosts[filteredIndex - 1].node;

		createPage({
			path: post.node.fields.slug,
			component,
			context: {
				slug: post.node.fields.slug,
				previous,
				next
			}
		});
	});
};

const setupGroups = async (graphql, createPage, type, component) => {
	const result = await graphql(
		`{ allMarkdownRemark (filter: { frontmatter: { type: { eq: "groups" }}}) {
        edges {
          node {
            frontmatter {
              groups {
                title
                urlSlug
                body
                groupType
                primaryImage
              }
            }
          }
        }
      }
    }`
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const posts = result.data.allMarkdownRemark.edges[0].node.frontmatter.groups;

	posts.forEach((post) => {
		const index = posts.findIndex((p) => p.title === post.title);
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.urlSlug,
			component,
			context: {
				slug: post.urlSlug,
				previous,
				next
			}
		});
	});
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	setupPage(graphql, createPage, path.resolve(`./src/templates/page.js`));
	setupData(graphql, createPage, 'news', path.resolve(`./src/templates/news-post.js`));
	setupData(graphql, createPage, 'events', path.resolve(`./src/templates/events-post.js`));
	setupGroups(graphql, createPage, 'groups', path.resolve(`./src/templates/groups-post.js`));
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });

		if (node.frontmatter.type) {
			createNodeField({
				name: `slug`,
				node,
				value: `${node.frontmatter.type}${value}`
			});
		} else {
			createNodeField({
				name: `slug`,
				node,
				value: `${value}`
			});
		}
	}
};
