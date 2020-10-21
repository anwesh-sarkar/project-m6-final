import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React from "react";
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import styled from "styled-components";
import Avatar from "./login/Avatar";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const geolocateStyle = {
    position: "relative",
    "margin-top": "10px",
    "margin-left": "260px",
    padding: "4px",
  };
  const geocoderContainerRef = React.useRef();
  const mapRef = React.useRef();
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  console.log(viewport.latitude);
  console.log(viewport.longitude);
  return (
    <Wrapper>
      {/* <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 500, zIndex: 1 }}
      /> */}

      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <MapComponents>
          <SearchLocation>
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              onViewportChange={handleViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </SearchLocation>
          <Zoom>
            <NavigationControl />
          </Zoom>
        </MapComponents>
        <Avatar />
      </MapGL>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const MapComponents = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchLocation = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Zoom = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-left: 10px;
  top: 5px;
`;
