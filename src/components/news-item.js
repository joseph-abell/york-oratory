/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'gatsby';
import { rhythm } from '../utils/typography';

const NewsItem = ({ node, title, primaryImage }) => (
    <div css={css`
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;

        &:last-of-type {
            border-bottom: 0;
        }
    `}>
        <h3
            css={css`
				font-size: 1.51572rem;
				margin-bottom: ${rhythm(1 / 4)};
			`}
        >
            <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
                {title}
            </Link>
        </h3>
        <small
            css={css`
				margin-bottom: ${rhythm(1 / 4)};
				display: block;
				color: rgba(0, 0, 0, 0.7);
			`}
        >
            {node.frontmatter.date}
        </small>
        <div css={css`clear: both;`} />
        {primaryImage && (
            <Link to={`/${node.fields.slug}`}>
                <img src={primaryImage} alt='' width='80%' />
            </Link>
        )}
        <p
            dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt
            }}
        />
    </div>
);

export default NewsItem;