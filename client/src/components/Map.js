import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import styled from "styled-components";
import MarkerComponent from "./mapComponents/Marker";
import TypeAhead from "./mapComponents/Typeahead";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 45.5017,
    longitude: -73.5673,
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

  return (
    <Wrapper>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <TypeAhead />
        <MarkerComponent />

        <SearchComponents>
          <Geocoder
            mapRef={mapRef}
            containerRef={geocoderContainerRef}
            onViewportChange={handleViewportChange}
            position="top-left"
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </SearchComponents>
        <Zoom>
          <NavigationControl />
        </Zoom>
      </ReactMapGL>
    </Wrapper>
  );
};

export default Map;

const Wrapper = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: row;
`;

const MapComponents = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchComponents = styled.div`
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
