import React from 'react';
import { Link } from 'gatsby';
import RichText from './richText';
import SliceZone from './sliceZone';
import styled from 'styled-components';

const BlogPostWrapper = styled.section`
  max-width: 800px;
  min-width: 800px;
  margin: 40px auto;
  background: var(--off_white);
  color: black;
  padding: 20px;
  border-radius: 10px;
`;

const BlogPost = ({title, date, body, uid}) => {

  console.log(title, date, body);

  return (
    <BlogPostWrapper>

      <Link to={`/blog/${uid}`}>
        <RichText render={title} />
      </Link>
      <p>{date}</p>
      {
        body &&
        <SliceZone body={body} />
      }

    </BlogPostWrapper>
  )
};

export default BlogPost;