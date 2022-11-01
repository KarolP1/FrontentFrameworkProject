import React from "react";
import {
  LoginChildren,
  LoginChildrenLeft,
  LoginContainer,
  StyledInputLogin,
  StyledInputLoginButton,
} from "./Login.style";
import loginimage from "../../../assets/loginimage.jpg";
import "./style.css";

export const LoginComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoginContainer>
      <LoginChildrenLeft>
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "absolute",
            background: "#67075799",
            width: "50%",
            height: "100%",
            color: "#fff",
            textTransform: "capitalize",
            fontFamily: "Kolker Brush",
            fontSize: "8rem",
            justifyContent: "center",
            paddingTop: "5rem",
          }}
        >
          With passion to photography
        </div>
        <img alt="imagehalfscreenphotography" src={loginimage} />
      </LoginChildrenLeft>
      <LoginChildren>{children}</LoginChildren>
    </LoginContainer>
  );
};

export const LoginInput = ({
  placeholder,
  value,
  setValue,
  type,
  autoFocus,
  dark,
  onPress,
}: {
  dark?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  setValue?: (text: string) => void;
  autoFocus?: boolean;
  onPress?: () => void;
}) => {
  return (
    <StyledInputLogin
      onClick={onPress}
      dark={dark}
      autoFocus={autoFocus ? autoFocus : false}
      type={typeof type === "string" ? type : ""}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        if (setValue) setValue(e.target.value);
      }}
    />
  );
};

export const LoginInputButton = ({
  value,
  type,
  dark,
  onClick,
}: {
  dark?: boolean;
  type?: string;
  value: string;
  onClick?: () => void;
}) => {
  return (
    <StyledInputLoginButton
      onClick={onClick}
      dark={dark}
      type={typeof type === "string" ? type : ""}
      value={value}
    />
  );
};
