import { executeReducerBuilderCallback } from "@reduxjs/toolkit/dist/mapBuilders";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.color.dark};
  flex: 1;
`;

export const LoginChildren = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  max-width: 50%;
  height: 100%;
  flex-direction: column;

  img {
    flex: 1;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
`;

export const StyledInputLogin = styled.input<{ dark?: boolean }>`
  padding: 1.5rem 4rem;
  margin: 1rem 0;
  border-radius: 5rem;
  box-shadow: none;
  border: ${(props) => `2px solid ${props.theme.color.darkest}`};
  background-color: ${(props) =>
    props.dark ? props.theme.color.darkest : "transparent"};
  color: ${(props) =>
    !props.dark ? props.theme.color.darkest : props.theme.color.dark};
  font-weight: 800;
  width: 100%;
`;

export const StyledInputLoginButton = styled.input<{ dark?: boolean }>`
  padding: 1.5rem 4rem;
  margin: 1rem 0;
  border-radius: 5rem;
  box-shadow: none;
  border: ${(props) => `2px solid ${props.theme.color.darkest}`};
  background-color: ${(props) =>
    props.dark ? props.theme.color.darkest : "transparent"};
  color: ${(props) =>
    !props.dark ? props.theme.color.darkest : props.theme.color.dark};
  font-weight: 800;
  width: 100%;
  animation: 5s box-shadow;

  :hover {
    box-shadow: ${(props) => `-2px 2px 15px ${props.theme.color.darkest}`};
  }
  :active {
    box-shadow: ${(props) => `-2px 2px 22px ${props.theme.color.darkest}`};
  }
`;

export const FormContainer = styled.div`
  @media (min-width: 768px) {
    width: 95%;
  }
  @media (min-width: 1240px) {
    width: 70%;
  }
`;

export const LogoTitle = styled.h2`
  font-size: 7rem;
  color: ${(props) => props.theme.color.darkest};
  margin-left: 2rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessageTxt = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.color.tint};
  text-align: center;
`;

export const LinkTxt = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.color.tint};
  text-align: center;
`;
