import React from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const Avatar = () => {
  return (
    <Button>
      <FaUserCircle size={35} />
    </Button>
  );
};

export default Avatar;

const Button = styled.button`
  position: absolute;
  transform: translate(180vh, 5px);
  background: none;
  border: none;
  z-index: 1;
`;
