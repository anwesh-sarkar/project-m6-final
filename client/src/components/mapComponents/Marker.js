import React from "react";
import { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAddress } from "../actions/users-actions";
import { getAllOfferedItems } from "../actions/offereditem-actions";
import { getAllWantedItems } from "../actions/wanteditem-actions";

const MarkerComponent = () => {
  const allUsers = useSelector((state) => state.allUsers.users);
  const allOfferedItems = useSelector((state) => state.offered.items);
  const allWantedItems = useSelector((state) => state.wanted.items);
  const searchedTerm = useSelector((state) => state.search.term);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const eachUserLoc = Object.values(
    allUsers.filter((user) => user.location.coordinates.length === 2)
  );

  React.useEffect(() => {
    dispatch(getAllOfferedItems());
    dispatch(getAllUsersAddress());
    dispatch(getAllWantedItems());
  }, [dispatch]);

  const searchedItem =
    allOfferedItems.filter((item) => item.name === searchedTerm)[0] ||
    allWantedItems.filter((item) => item.name === searchedTerm)[0];

  const usersWithItem = searchedItem
    ? allUsers.filter((user) => user._id === searchedItem.user)
    : [];

  return (
    <>
      {eachUserLoc.map((user) => {
        return (
          <Marker
            key={user._id}
            longitude={user.location.coordinates[0]}
            latitude={user.location.coordinates[1]}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(user);
              }}
            >
              {usersWithItem.find((foundUser) => foundUser._id === user._id) ? (
                <Image
                  src={
                    "https://icon-library.com/images/location-png-icon/location-png-icon-12.jpg"
                  }
                />
              ) : (
                <Image
                  src={"https://img.icons8.com/color/48/000000/marker.png"}
                />
              )}
            </Button>
          </Marker>
        );
      })}
      {selectedUser ? (
        <Popup
          latitude={selectedUser.location.coordinates[1]}
          longitude={selectedUser.location.coordinates[0]}
          onClose={() => setSelectedUser(null)}
        >
          <div>{selectedUser.name}</div>
          <p>Offering: </p>
          {selectedUser.offering.map((offeredItem, _id) => (
            <span key={offeredItem._id + "o"}>{offeredItem.name}, </span>
          ))}
          <p>Wanted: </p>
          {selectedUser.wanted.map((wantedItem, _id) => (
            <span key={wantedItem._id + "w"}>{wantedItem.name}, </span>
          ))}
          <button>Start Chat</button>
        </Popup>
      ) : null}
    </>
  );
};

export default MarkerComponent;

const Button = styled.button`
  background: none;
  border: none;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
`;
