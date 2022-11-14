import React from "react";
import AppBar from "./AppBar";
import { LoggedInContainer, ScrollContainer } from "./signedInContainer.styled";

const SignedInContainer = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: "Profile";
}) => {
  return (
    <LoggedInContainer>
      <AppBar type={type} />
      <ScrollContainer>{children}</ScrollContainer>
    </LoggedInContainer>
  );
};

export default SignedInContainer;
