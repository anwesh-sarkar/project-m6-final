import React from "react";
import styled from "styled-components";

const Register = () => {
  const [imgUpload, setImgUpload] = React.useState(
    "https://www.edgehill.ac.uk/wp-content/uploads/fa-user-circle-o.png"
  );

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUpload(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Wrapper>
      <InputRegistration>
        <h1>Register</h1>
        <h3>
          Welcome to Kindred! We are excited about your journey into breaking
          away from capitalism and building relationships! Please fill in your
          details to register with us.
        </h3>
        <Form>
          <Label>
            <Title>Name:</Title>
            <Input type="text" required="required" />
          </Label>
          <Label>
            <Title>Email Address:</Title>
            <Input type="text" required="required" />
          </Label>
          <Label>
            <Title>Password:</Title>
            <Input type="text" required="required" />
          </Label>
          <Label>
            <Title>Confirm Password:</Title>
            <Input type="text" required="required" />
          </Label>
        </Form>
        <Button>Submit</Button>
      </InputRegistration>
      <ImageUpload>
        <h3>Upload Profile Picture</h3>
        <Image src={imgUpload} />
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </ImageUpload>
    </Wrapper>
  );
};

export default Register;

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
`;

const Image = styled.img`
  width: 400px;
  height: 350px;
`;
