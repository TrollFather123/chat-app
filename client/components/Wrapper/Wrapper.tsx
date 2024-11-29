import { Box, BoxProps, styled } from "@mui/material";
import React from "react";
import ButtonAppBar from "../Header/Header";

const WrapperStyled = styled(Box)``;

const Wrapper: React.FC<BoxProps> = ({ ...props }) => {
  return (
    <WrapperStyled {...props}>
      <ButtonAppBar />
      {props?.children}
    </WrapperStyled>
  );
};

export default Wrapper;
