import React from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import Menu from "./Menu";

const AvatarButton = () => {
  const [showMenuModal, setShowMenuModal] = React.useState(false);

  const toggleButton = () => {
    setShowMenuModal(!showMenuModal);
    console.log(showMenuModal);
  };

  return (
    <>
      <Button onClick={toggleButton}>
        <FaUserCircle size={75} />
      </Button>

      {showMenuModal && <Menu />}
    </>
  );
};

export default AvatarButton;

const Button = styled.button`
  position: absolute;
  transform: translate(93.5vw, -94.5vh);
  background: none;
  border: none;
  z-index: 1;
  cursor: pointer;
  &:hover {
    color: purple;
  }
`;
