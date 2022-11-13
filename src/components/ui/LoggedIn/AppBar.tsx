import React from "react";
import { Logo } from "../../../pages/authfalse/LoginPage";
import { AppbarContainer } from "./AppBar.styled";
import { BiLogOut } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import "./style.css";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/login.slice";
import SearchUser from "./SearchUser";
import { Link } from "react-router-dom";

const AppBar = () => {
  const dispatch = useAppDispatch();
  return (
    <AppbarContainer>
      <Link to="/">
        <Logo height={30} align={"flex-start"} />
      </Link>
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
