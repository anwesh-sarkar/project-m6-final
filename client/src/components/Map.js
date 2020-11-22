import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import React from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAddress } from "./actions/users-actions";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const allUsers = useSelector((state) => state.allUsers.users);
  console.log(allUsers);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllUsersAddress());
  }, []);

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

  const eachUser = Object.values(
    allUsers.filter((user) => user.location.coordinates.length === 2)
  );

  //mapboxApiAccessToken={MAPBOX_TOKEN}
  return (
    <Wrapper>
      {/* <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 500, zIndex: 1 }}
      /> */}

      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {eachUser.map((user) => (
          <Marker
            longitude={user.location.coordinates[0]}
            latitude={user.location.coordinates[1]}
          >
            <button>
              <img src={"https://img.icons8.com/color/48/000000/marker.png"} />
            </button>
          </Marker>
        ))}

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
