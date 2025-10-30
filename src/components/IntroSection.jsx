
import React from "react";
import styled from "styled-components";

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin: 2 rem auto;
  padding: 2rem;
  max-width: 1600px;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

/*const IntroText = styled.div`
  flex: 1;
  padding: 1rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
    font-family:'Lobster'
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;*/

const IntroText = styled.div`
  flex: 1;
  padding: 1rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
    font-family: 'Lobster', cursive;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1rem;
    line-height: 1.5;
    font-family:'Roboto Slab', serif;
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: #666;
  margin-top: 5rem;
  padding-left: 1rem;
  border-left: 4px solid #e0e0e0;
  font-size: 1rem;
  line-height: 1.6;
`;


const IntroImage = styled.img`
  flex: 1;
  max-width: 650px;
  max-height:450px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const IntroSection = () => (
  <Feature>
    <IntroImage src="/introImage.jpg" alt="Delicious Food" />
    {/*<IntroText>
      <h2>Welcome to Foodie-Hub</h2>
      <p>Discover traditional to trending recipes, from quick meals to festive delights — all in one place.</p>
    </IntroText>*/}

    <IntroText>
  <h2>Welcome to Foodie-Hub</h2>
  <p>
    At Foodie-Hub, we believe food is a universal language that connects hearts and homes. Our handpicked recipes are easy to follow, full of flavor, and designed to make your time in the kitchen more enjoyable. Explore cuisines from around the world, rediscover family favorites, or try something completely new. Every dish here is crafted to turn ordinary ingredients into unforgettable experiences.
  </p>
  <Quote>
    "A recipe has no soul. You, as the cook, must bring soul to the recipe.It’s the emotion and experience you add that turns it into something unforgettable." — Thomas Keller
  </Quote>
</IntroText>

  </Feature>
);

export default IntroSection;
