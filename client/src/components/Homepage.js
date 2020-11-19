import Map from "./Map";
import AvatarButton from "./login/AvatarButton";

import React from "react";

const Homepage = () => {
  return (
    <div>
      <Map />
      <AvatarButton style={{ transform: "translate(93.5vw, -94.5vh)" }} />
    </div>
  );
};

export default Homepage;
