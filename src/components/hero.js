import React from 'react';
import RichText from './richText';
import styled from 'styled-components';

const HeroWrapper = styled.section`
  background: url('${props => props.backgroundImage}');
  // background: var(--light_gray);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--dark_red);
  color: var(--yellow);

  div {
    max-width: 800px;
    margin: 0 auto;
    // background: rgba(0,0,0,0.5);
    padding: 10px;

    h1 {
      font-size: 60px;
    }
  }
`;

const Hero = ({title, content, backgroundImage}) => {
  console.log(title, content, backgroundImage);
  return (
    <HeroWrapper 
      backgroundImage={backgroundImage}
    >
      <div>
        <RichText render={title} />
        <p>{content}</p>
      </div>
    </HeroWrapper>
  );
};

export default Hero;