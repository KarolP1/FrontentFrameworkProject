import React from "react";
import AppBar from "./AppBar";
import { LoggedInContainer, ScrollContainer } from "./signedInContainer.styled";

const SignedInContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoggedInContainer>
      <AppBar />
      <ScrollContainer>{children}</ScrollContainer>
    </LoggedInContainer>
  );
};

export default SignedInContainer;
