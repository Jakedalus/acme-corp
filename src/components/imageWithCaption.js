import React from 'react';
import RichText from './richText';
import styled from 'styled-components';

const ImageWithCaption = ({image, imageCaption}) => {
  console.log(image, imageCaption);

  return (
    <div>
      <img src={image.url} alt={image.alt}/>
      <RichText render={imageCaption} />
    </div>
  );
};

export default ImageWithCaption;