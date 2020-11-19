import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";

const Menu = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <MenuList>
        <MenuItem>
          <Link to="/settings">
            <Button>Settings</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/offering">
            <Button>Set Offering</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/wanted">
            <Button>Set Wanted</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/logout">
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </Link>
        </MenuItem>
      </MenuList>
    );
  } else {
    return (
      <MenuList style={{ transform: "translate(80.9vw, -94.5vh)" }}>
        <MenuItem>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </MenuItem>
      </MenuList>
    );
  }
};

export default Menu;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  /* transform: translate(70vw, -94.5vh); */
`;

const MenuItem = styled.li`
  list-style-type: none;
`;

const Button = styled.button`
  width: 100px;
  height: 55px;
  background-color: black;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: purple;
  }
`;
