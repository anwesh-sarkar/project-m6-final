import React from "react";
import styled from "styled-components";
import { addWantedItem } from "../actions/wanteditem-actions";
import { useDispatch, useSelector } from "react-redux";

const AddWantedItemModal = () => {
  const dispatch = useDispatch();

  const [item, setItem] = React.useState(null);
  const [showAddWantedItemModal, setShowAddWantedItemModal] = React.useState(
    false
  );

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const showModal = () => {
    setShowAddWantedItemModal(!showAddWantedItemModal);
    console.log(showAddWantedItemModal);
  };

  const onChange = (e) => {
    e.preventDefault();
    setItem(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: item,
      user: user._id,
    };

    dispatch(addWantedItem(newItem));
    showModal();
  };

  return (
    <Wrapper>
      <Button onClick={showModal}>Add Item</Button>
      {showModal && (
        <div>
          <input type="text" onChange={onChange} />
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      )}
    </Wrapper>
  );
};

export default AddWantedItemModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 70vh;
  width: 80vw; */
  align-items: center;
  margin: 0 auto;
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
