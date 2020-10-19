import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
import styled from "styled-components";
import 'mapbox-gl/dist/mapbox-gl.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const geolocateStyle = {
//   float: 'left',
//   margin: '50px',
//   padding: '10px'
// };


// const Homepage = () => {
// const [viewport, setViewport] = React.useState({
//   width: 400,
//   height: 400,
//   lat: 37.7524,
//   lng: -122.4343,
// });

// const [searchResultLayer,setSearchResultLayer] = React.useState(null);

// const mapRef = React.useRef();
// const handleViewPortChange = React.useCallback((newViewport) => setViewport(newViewport),[]);
// // const handleOnResult = (event) => {setSearchResultLayer(new GeoJsonLayer({
// //   id: "search-result",
// //   data: event.result.geometry,
// //   getFillColor: [255, 0, 0, 128],
// //   getRadius: 1000,
// //   pointRadiusMinPixels: 10,
// //   pointRadiusMaxPixels: 10
// // }))}

// return (
// <Wrapper>
// <div>Test</div>
// <ReactMapGL
//   // ref={mapRef} 
//   {...viewport} 
//   onViewportChange={handleViewPortChange}
//   width="95vw"
//   height="95vh" 
//   mapStyle="mapbox://styles/mapbox/streets-v9" 
//   mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
//   {/* <Geocoder
//     mapRef={mapRef}
//     onViewportChange={handleViewPortChange}
//     // onResult={handleOnResult}
//     mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
//     position="top-left"
//         /> 
//    <DeckGL {...viewport} layers={[searchResultLayer]} />  */}
//    <GeolocateControl 
//   style={geolocateStyle}
//   positionOptions={{enableHighAccuracy: true}}
//   trackUserLocation={true}/>
//   <NavigationControl/>
// </ReactMapGL>
// <div>Test</div>
// </Wrapper>);

// }


const Homepage = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const geocoderContainerRef = React.useRef();
  const mapRef = React.useRef();
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
  <Wrapper>
    <div style={{ height: "100vh" }}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11" 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          position="top-left"
        />
      </ReactMapGL>
    </div>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div``;