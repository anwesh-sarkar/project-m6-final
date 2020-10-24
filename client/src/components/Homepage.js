import Map from "./Map";
import AvatarButton from "./login/AvatarButton";

import React from "react";
import styled from "styled-components";

const Homepage = () => {
  return (
    <div>
      <Map />
      <AvatarButton />
    </div>
  );
};

export default Homepage;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
`;
