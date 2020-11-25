import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateAddress } from "../../components/actions/address-actions";
import { clearErrors } from "../../components/actions/error-actions";
import MenuBar from "../../components/login/MenuBar";

const Settings = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.error);
  const errorMessage = Object.values(error.message);
  const [address, setAddress] = React.useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    user: null,
  });

  const [imgUpload, setImgUpload] = React.useState(
    "https://www.edgehill.ac.uk/wp-content/uploads/fa-user-circle-o.png"
  );

  const handleChange = (e) => {
    const value = e.target.value;

    setAddress({
      ...address,
      [e.target.name]: value,
      user: user._id,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(address);
    dispatch(updateAddress(address));
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

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <MenuBar />
        <SettingsForm>
          <SettingsInput>
            <h1>Settings</h1>
            <h3>Update Address</h3>
            <Form>
              <Label>
                <Title>Street:</Title>
                <Input
                  name="street"
                  id="street"
                  type="text"
                  placeholder="Street"
                  required="required"
                  value={address.street}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>City:</Title>
                <Input
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                  required="required"
                  value={address.city}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Province/State:</Title>
                <Input
                  name="state"
                  id="state"
                  type="text"
                  placeholder="Province/State"
                  required="required"
                  value={address.state}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Postal/Zip Code:</Title>
                <Input
                  name="zip"
                  id="zip"
                  type="text"
                  placeholder="Postal/Zip Code"
                  required="required"
                  value={address.zip}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                <Title>Country:</Title>
                <Input
                  name="country"
                  id="country"
                  type="text"
                  placeholder="Country"
                  required="required"
                  value={address.country}
                  onChange={handleChange}
                />
              </Label>
            </Form>
            <Button onClick={handleClick}>Update</Button>
            {error.status === 400 || error.status === 403 ? (
              <div>{errorMessage}</div>
            ) : null}
          </SettingsInput>
          <ImageUpload>
            <h3>Upload Profile Picture</h3>
            <Image src={imgUpload} />
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </ImageUpload>
        </SettingsForm>
      </Wrapper>
    );
  }
};

export default Settings;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100vw;
  border: 1px solid black;
  align-items: center;
`;

const SettingsForm = styled.div`
  display: flex;
  flex-direction: row;
`;

const SettingsInput = styled.div`
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
