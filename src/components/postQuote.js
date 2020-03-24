import React from 'react';
import RichText from './richText';
import styled from 'styled-components';

const PostQuote = ({quote}) => {
  console.log(quote);

  return (
    <div>
      <RichText render={quote} />
    </div>
  );
};

export default PostQuote;