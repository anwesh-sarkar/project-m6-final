import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth-actions";

const MenuItems = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  if (isAuthenticated) {
    return (
      <MenuList style={{ transform: "translate(64.5vw, -94.5vh)" }}>
        <MenuItem>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </MenuItem>
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
          <Button onClick={(e) => handleLogout(e)}>Logout</Button>
        </MenuItem>
      </MenuList>
    );
  } else {
    return (
      <MenuList>
        <MenuItem>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </MenuItem>
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

export default MenuItems;

const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  transform: translate(75.5vw, -93.5vh);
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
