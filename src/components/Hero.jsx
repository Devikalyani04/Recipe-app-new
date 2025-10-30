
import React from "react";
import styled from "styled-components";
import Search from "./Search"; 

const HeroSection = styled.section`
  text-align: center;
  color: #fff;
`;

const Tagline = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  font-family: 'Lobster';
  margin: 1rem auto 1rem;
  color:rgb(56,56,56);
`;

const Hero = () => {
  return (
    <HeroSection>
      <Tagline>Craving something tasty? Let’s find it!</Tagline>
      <Search />
    </HeroSection>
  );
};

export default Hero;
