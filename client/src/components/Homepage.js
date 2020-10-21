import Map from "./Map";
import Avatar from "./login/Avatar";

import React from "react";
import styled from "styled-components";

const Homepage = () => {
  return (
    <>
      <Map />
    </>
  );
};

export default Homepage;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
`;
