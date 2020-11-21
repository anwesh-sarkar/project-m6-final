import React from "react";
import styled from "styled-components";
import AddWantedItemModal from "../items/AddWantedItemModal";
import MenuBar from "../login/MenuBar";
import { useSelector, useDispatch } from "react-redux";
import {
  getWantedItems,
  deleteWantedItem,
} from "../actions/wanteditem-actions";

const SetWanted = () => {
  const [loadingState, setLoadingState] = React.useState("loading");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getWantedItems());
    setLoadingState("loaded");
  }, []);

  const items = useSelector((state) => state.wanted.items);

  if (loadingState === "loaded") {
    return (
      <>
        <MenuBar />
        <Wrapper>
          <h1>What Are You Looking For?</h1>

          <OrderedList>
            {items.map((item, _id) => (
              <ListItem key={item._id}>
                {item.name}
                <DeleteButton
                  onClick={() => dispatch(deleteWantedItem(item._id))}
                >
                  Delete
                </DeleteButton>
              </ListItem>
            ))}
          </OrderedList>

          <AddWantedItemModal />
        </Wrapper>
      </>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default SetWanted;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100vw;
  border: 1px solid black;
  align-items: center;
  margin: 0 auto;
`;

const OrderedList = styled.ol``;

const Input = styled.input`
  width: 300px;
  resize: none;
  overflow: auto;
`;

const ListItem = styled.li`
  padding: 10px;
`;

const Button = styled.button`
  height: 50px;
  width: 150px;
  background-color: black;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  &:hover {
    background-color: purple;
  }
`;

const DeleteButton = styled.button`
  height: 25px;
  width: 80px;
  background-color: black;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: purple;
  }
`;
