import { useState } from "react";
import { Box } from "@mui/system";
import { Button, Typography, FormControl, TextField } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import { Google } from "@mui/icons-material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import useTokenStore from "../../store/userStore.js";

import {
  FormContainer,
  FormContainerFooter,
  FormImageContainer,
  LoginFormContainer,
  StyledFlexBoxContainer,
} from "./Authentication.styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const request = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { statusText, data } = request;
      // const response = await request.data;
      if (statusText === "OK") {
        console.log(data);
        useTokenStore.setState({
          token: data.token,
          userId: data.user.id,
          userName: data.user.name,
        });
        navigate("/home");
      }
      // console.log(response.token);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <StyledFlexBoxContainer
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LoginFormContainer
        display="flex"
        justifyContent="space-between"
        borderRadius={5}
      >
        <FormImageContainer></FormImageContainer>
        <FormContainer>
          <Box>
            <ApartmentIcon />
          </Box>
          <Typography variant="h4">Hello again!</Typography>
          <Typography variant="paragraph">
            Please enter your credentials to get started with our system
          </Typography>
          <FormControl>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
              }}
            >
              <TextField
                name="email"
                type="email"
                label="email"
                sx={{
                  width: "25rem",
                  marginTop: "1rem",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                name="password"
                type="password"
                label="password"
                sx={{
                  width: "25rem",
                  marginTop: "1rem",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box display={"flex"} justifyContent="space-between" mt={2}>
                <Checkbox />
                <Link href="#with-card">Recovery Password</Link>
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "25rem",
                  marginTop: "1rem",
                  backgroundColor: "#295DC6",
                  borderRadius: "10px",
                }}
              >
                Login
              </Button>
            </form>
            <Button
              sx={{
                width: "25rem",
                marginTop: "1rem",
              }}
            >
              <Google color="success" />
              <Typography
                fontSize={10}
                ml={1}
                textTransform="capitalize"
                color="grey"
              >
                Signin with google
              </Typography>
            </Button>
          </FormControl>
          <FormContainerFooter>
            <Typography>
              Don't have an account yet? <Link>Sign Up</Link>
            </Typography>
          </FormContainerFooter>
        </FormContainer>
      </LoginFormContainer>
    </StyledFlexBoxContainer>
  );
};

export default Authentication;
