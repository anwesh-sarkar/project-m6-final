import Map from "./Map";
import AvatarButton from "./login/AvatarButton";

import React from "react";
import TypeAhead from "./mapComponents/Typeahead";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAddress } from "./actions/users-actions";
import { getAllOfferedItems } from "./actions/offereditem-actions";

const Homepage = () => {
  const allUsers = useSelector((state) => state.allUsers.users);
  const allOfferedItems = useSelector((state) => state.offered.items);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllOfferedItems());
    dispatch(getAllUsersAddress());
  }, [dispatch]);
  return (
    <div>
      <Map />
      <AvatarButton style={{ transform: "translate(93.5vw, -94.5vh)" }} />
    </div>
  );
};

export default Homepage;
