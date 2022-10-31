import React, { useEffect, useState } from "react";
import {
  LoginChildren,
  LoginContainer,
  StyledInputLogin,
  StyledInputLoginButton,
} from "./Login.style";
import loginimage from "../../../assets/loginimage.jpg";

export const LoginComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoginContainer>
      <LoginChildren>
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
        <img src={loginimage} />
      </LoginChildren>
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
  const [valueState, setValueState] = useState(value);
  useEffect(() => {
    if (setValue) setValue(valueState);
  }, [valueState]);
  return (
    <StyledInputLogin
      onClick={onPress}
      dark={dark}
      autoFocus={autoFocus ? autoFocus : false}
      type={typeof type === "string" ? type : ""}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValueState(e.target.value)}
    />
  );
};
export const LoginInputButton = ({
  placeholder,
  value,
  setValue,
  type,
  autoFocus,
  dark,
  onClick,
}: {
  dark?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  setValue?: (text: string) => void;
  autoFocus?: boolean;
  onClick?: () => void;
}) => {
  const [valueState, setValueState] = useState(value);
  useEffect(() => {
    if (setValue) setValue(valueState);
  }, [valueState]);
  return (
    <StyledInputLoginButton
      onClick={onClick}
      dark={dark}
      autoFocus={autoFocus ? autoFocus : false}
      type={typeof type === "string" ? type : ""}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValueState(event.target.value)}
    />
  );
};
