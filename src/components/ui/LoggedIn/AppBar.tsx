import React from "react";
import { Logo } from "../../../pages/authfalse/LoginPage";
import { AppbarContainer } from "./AppBar.styled";
import { BiLogOut } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import "./style.css";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/login.slice";
import SearchUser from "./SearchUser";

const AppBar = () => {
  const dispatch = useAppDispatch();
  return (
    <AppbarContainer>
      <Logo height={40} align={"flex-start"} />
      <SearchUser />
      <ThemeConsumer>
        {(theme) => (
          <>
            <BiLogOut
              className="icon"
              color={theme.color.tint}
              size={30}
              onClick={() => dispatch(logout())}
            />
          </>
        )}
      </ThemeConsumer>
    </AppbarContainer>
  );
};

export default AppBar;
