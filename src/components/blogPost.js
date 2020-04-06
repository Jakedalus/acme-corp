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

  a {
    text-decoration: none;
    color: var(--blue); 
    // transition: filter .2s ease-in;

    p, h1 {
      margin: 0;
      margin-bottom: 5px;
    }

    .date {
      font-weight: bold;
    }

    &:hover {
      filter: brightness(200%);
    }
  }

  // a:after {
  //   content: '';
  //   width: 0px;
  //   height: 1px;
  //   display: block;
  //   background: var(--blue);
  //   transition: 300ms;
  // }

  // a:hover:after {
  //   width: 100%;
  // }
`;

const BlogPost = ({title, date, body, uid}) => {

  console.log(title, date, body);

  return (
    <BlogPostWrapper>

      <Link to={`/blog/${uid}`}>
        <RichText render={title} />
        <p className="date">{date}</p>
      </Link>
      
      {
        body &&
        <SliceZone body={body} />
      }

    </BlogPostWrapper>
  )
};

export default BlogPost;