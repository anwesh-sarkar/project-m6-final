import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../components/actions/auth-actions";
import { clearErrors } from "../../components/actions/error-actions";
import MenuBar from "../../components/login/MenuBar";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);
  const errorMessage = Object.values(error.message);
  const [registerUser, setRegisterUser] = React.useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [imgUpload, setImgUpload] = React.useState(
    "https://www.edgehill.ac.uk/wp-content/uploads/fa-user-circle-o.png"
  );

  const handleChange = (e) => {
    const value = e.target.value;

    setRegisterUser({
      ...registerUser,
      [e.target.name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(register(registerUser));
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUpload(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      dispatch(clearErrors());
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <MenuBar />
        <RegistrationForm>
          <InputRegistration>
            <h1>Register</h1>
            <h3>
              Welcome to Kindred! We are excited about your journey into
              breaking away from capitalism and building relationships! Please
              fill in your details to register with us.
            </h3>
            <Form>
              <Label>
                <Title>Name:</Title>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Name"
                  required="required"
                  value={registerUser.name}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Email Address:</Title>
                <Input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Email"
                  required="required"
                  value={registerUser.username}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Password:</Title>
                <Input
                  name="password"
                  id="password"
                  type="text"
                  placeholder="Password"
                  required="required"
                  value={registerUser.password}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Confirm Password:</Title>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="text"
                  placeholder="Confirm Password"
                  required="required"
                  value={registerUser.confirmPassword}
                  onChange={handleChange}
                />
              </Label>
            </Form>
            <Button onClick={handleClick}>Register</Button>
            {error.status === 400 || error.status === 403 ? (
              <div>{errorMessage}</div>
            ) : null}
          </InputRegistration>
          <ImageUpload>
            <h3>Upload Profile Picture</h3>
            <Image src={imgUpload} />
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </ImageUpload>
        </RegistrationForm>
      </Wrapper>
    );
  }
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100vw;
  border: 1px solid black;
  align-items: center;
`;

const RegistrationForm = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputRegistration = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 65vh;
  padding: 25px;
  margin-left: 25px;
`;

const ImageUpload = styled.div`
  height: 70vh;
  width: 50vw;
  align-items: center;
  text-align: center;
  margin-top: 120px;
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
  &:disabled {
    background-color: grey;
  }
`;

const Image = styled.img`
  width: 400px;
  height: 350px;
`;
