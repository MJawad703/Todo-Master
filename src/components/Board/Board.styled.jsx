import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";
export const StyledCard = styled(Card)`
  min-width: 275px;
  max-width: 400px;
  background-color: #f0f0f0; // or #ECEFF1 for pale blue
`;

export const StyledTitle = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  ${"" /* background-color: #e0e0e0; // or #455A64 for darker blue */}
`;

export const StyledDescription = styled(Typography)`
  font-size: 16px;
  margin-bottom: 10px;
  ${"" /* background-color: #bdbdbd; // or #424242 for darker gray */}
`;
