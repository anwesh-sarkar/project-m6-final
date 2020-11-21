import React from "react";
import styled from "styled-components";
import MenuItems from "./MenuItems";

const MenuBar = () => {
  return (
    <Wrapper>
      <MenuItems />
    </Wrapper>
  );
};

export default MenuBar;

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 55px;
`;
