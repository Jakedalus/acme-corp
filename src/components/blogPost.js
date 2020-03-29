import React from 'react';
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

const BlogPost = ({title, date, body}) => {

  console.log(title, date, body);

  return (
    <BlogPostWrapper>

      <RichText render={title} />
      <p>{date}</p>
      {
        body &&
        <SliceZone body={body} />
      }

    </BlogPostWrapper>
  )
};

export default BlogPost;