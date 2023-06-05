import styled from "@emotion/styled";
import { Hidden } from "@mui/material";
import { Box } from "@mui/system";

export const StyledFlexBoxContainer = styled(Box)({
  minHeight: "100vh",
  maxHeight: "100vw",
  margin: 0,
  padding: 0,
  overflow: "hidden",
});

export const LoginFormContainer = styled(Box)({
  minHeight: "50rem",
  minWidth: "60rem",
  border: "1px solid black",
  overflow: "hidden",
});

export const FormImageContainer = styled(Box)({
  //   background: "red",
  //   minWidth: "50%",
  // minHeight: "50rem",

  flexBasis: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // alignSelf: "stretch",
  backgroundColor: "#295DC6",
  overflow: "hidden !important",
});

export const FormContainer = styled(Box)({
  // minHeight: "50rem",
  position: "relative",
  flexBasis: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // background: "lightblue",
  alignSelf: "stretch",
});

export const FormContainerFooter = styled(Box)({
  position: "absolute",
  bottom: "20px",
});
