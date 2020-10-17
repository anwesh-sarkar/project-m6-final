import React from "react";
import ReactMapGL from "react-map-gl";
import styled from "styled-components";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Homepage = () => {
const [viewport, setViewport] = React.useState({
  width: 400,
  height: 400,
  
});
return (<Wrapper>
<ReactMapGL {...viewport} onViewportChange={nextViewport => setViewport(nextViewport)} width="100vw" height="100vh" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/></Wrapper>);
}

export default Homepage;

const Wrapper = styled.div``;