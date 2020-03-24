import React from 'react';
import RichText from './richText';
import SliceZone from '../components/sliceZone';
// import styled from 'styled-components';

const BlogPost = ({title, body}) => {

  console.log(title, body);

  return (
    <div>

      <RichText render={title} />
      {
        body &&
        <SliceZone body={body} />
      }

    </div>
  )
};

export default BlogPost;