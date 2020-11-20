import React from "react";
import styled from "styled-components";
import AvatarButton from "../../components/login/AvatarButton";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../components/actions/auth-actions";
import { clearErrors } from "../../components/actions/error-actions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const errorMessage = Object.values(error.message);

  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setLoginUser({
      ...loginUser,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginUser));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      dispatch(clearErrors());
    }
  });

  return (
    <Wrapper>
      <AvatarButton />
      <InputRegistration>
        <h1>Login</h1>
        <h3>
          Welcome to Kindred! We are excited about your journey into breaking
          away from capitalism and building relationships!
        </h3>
        <Form>
          <Label>
            <Title>Email Address:</Title>
            <Input
              type="text"
              id="username"
              name="username"
              required="required"
              onChange={handleChange}
            />
          </Label>
          <Label>
            <Title>Password:</Title>
            <Input
              type="text"
              id="password"
              name="password"
              required="required"
              onChange={handleChange}
            />
          </Label>
        </Form>
        <Button onClick={handleSubmit}>Submit</Button>
        {error.status == 400 || error.status == 403 ? (
          <div>{errorMessage}</div>
        ) : null}
      </InputRegistration>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 70vh;
  width: 100vw;
  border: 1px solid black;
  align-items: center;
`;

const InputRegistration = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 65vh;
  padding: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  width: 450px;
  padding: 10px;
`;

const Title = styled.div`
  width: 150px;
`;

const Input = styled.input`
  width: 300px;
  resize: none;
  overflow: auto;
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
