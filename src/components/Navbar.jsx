import React, { useState, useRef, useEffect }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  return (
    <NavContainer>
      <Logo to="/">
        <GiKnifeFork />
        Foodie-Hub
      </Logo>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        {/*<StyledLink to="/#recipes">Recipes</StyledLink>*/}

         {/* <Dropdown>
          <DropdownToggle>Recipes ▾</DropdownToggle>
          <DropdownMenu>
            <DropdownLabel>Cuisine</DropdownLabel>
            <DropdownItem to="/cuisine/Italian">Italian</DropdownItem>
            <DropdownItem to="/cuisine/Chinese">Chinese</DropdownItem>
            <DropdownItem to="/cuisine/Thai">Thai</DropdownItem>
            <DropdownItem to="/cuisine/Japanese">Japanese</DropdownItem>
          </DropdownMenu>
        </Dropdown>*/}


         <Dropdown ref={dropdownRef}>
          <DropdownToggle onClick={() => setIsOpen(prev => !prev)}>
            Recipes ▾
          </DropdownToggle>
          {isOpen && (
            <DropdownMenu>
              <DropdownLabel>Cuisine</DropdownLabel>
              <DropdownItem to="/cuisine/Italian">Italian</DropdownItem>
              <DropdownItem to="/cuisine/Chinese">Chinese</DropdownItem>
              <DropdownItem to="/cuisine/Thai">Thai</DropdownItem>
              <DropdownItem to="/cuisine/Japanese">Japanese</DropdownItem>
              <DropdownItem to="/cuisine/Indian">Indian</DropdownItem>

               {/*<DropdownLabel>Dish Type</DropdownLabel>
              <DropdownItem to="/type/main%20course">Main Course</DropdownItem>
              <DropdownItem to="/type/side%20dish">Side Dish</DropdownItem>
              <DropdownItem to="/type/dessert">Dessert</DropdownItem>
              <DropdownItem to="/type/appetizer">Appetizer</DropdownItem>
              <DropdownItem to="/type/soup">Soup</DropdownItem>*/}


              <DropdownLabel>Dish Type</DropdownLabel>
              <DropdownItem to="/type/Main-Course">Main Course</DropdownItem>
              <DropdownItem to="/type/Dessert">Dessert</DropdownItem>
              <DropdownItem to="/type/Appetizer">Appetizer</DropdownItem>
              <DropdownItem to="/type/Soup">Soup</DropdownItem>
              <DropdownItem to="/type/Salad">Salad</DropdownItem>

              
            </DropdownMenu>
          )}
        </Dropdown>

       


        <StyledLink to="/#about">About Us</StyledLink>
        {user && <LogoutButton onClick={onLogout}>Logout</LogoutButton>}
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color:#D8BFD8;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Logo = styled(Link)`
  font-family: "Lobster Two", cursive;
  font-size: 1.8rem;
  text-decoration: none;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #444;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #7c3aed;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownToggle = styled.div`
  cursor: pointer;
  color: #444;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    color: #7c3aed;
  }
`;

const DropdownMenu = styled.div`
 
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  top: 2rem;
  left: 0;
  min-width: 160px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;


`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;

  &:hover {
    background-color: #f3e8ff;
    color: #7c3aed;
  }
`;

const DropdownLabel = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  padding: 10px 16px 5px 16px;
  color: #7c3aed;
  background-color: #f9f5ff;
  border-bottom: 1px solid #eee;
`;


const LogoutButton = styled.button`
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
`;


export default Navbar;
