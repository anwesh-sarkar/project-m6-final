import React from "react";
import styled from "styled-components";

const SetWanted = () => {
  return (
    <Wrapper>
      <h1>What Are You Looking For?</h1>
      <OrderedList>
        <ListItem>
          <Input type="text" />
          <DeleteButton>Delete</DeleteButton>
        </ListItem>
        <ListItem>
          <Input type="text" />
          <DeleteButton>Delete</DeleteButton>
        </ListItem>
        <ListItem>
          <Input type="text" />
          <DeleteButton>Delete</DeleteButton>
        </ListItem>
      </OrderedList>
      <Button>Submit</Button>
    </Wrapper>
  );
};

export default SetWanted;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 80vw;
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
