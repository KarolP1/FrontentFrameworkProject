import React from "react";
import { Logo } from "../../../pages/authfalse/LoginPage";
import { AppbarContainer } from "./AppBar.styled";
import { BiLogOut, BiPlusCircle, BiUser } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/login.slice";
import SearchUser from "./SearchUser";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/slices/Users/Users.slice";

const AppBar = ({ type }: { type?: "Profile" }) => {
  const loggedInUser = useAppSelector((state) => state.Users.loggedInUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <AppbarContainer>
      <Link to="/" style={{ textDecoration: "none " }}>
        <Logo height={30} align={"flex-start"} />
      </Link>
      <SearchUser type={type} />
      <ThemeConsumer>
        {(theme) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>{loggedInUser?.id}</div>
            <Link to={`/image/post/`}>
              <BiPlusCircle
                className="icon"
                color={theme.color.tint}
                size={30}
              />
            </Link>
            <Link to={`/profile/${loggedInUser?.username}`}>
              <BiUser className="icon" color={theme.color.tint} size={30} />
            </Link>
            <BiLogOut
              className="icon"
              color={theme.color.tint}
              size={30}
              onClick={() => {
                dispatch(logout());
                dispatch(setUser(null));
                sessionStorage.setItem("loggedInId", "");
                navigate("/");
              }}
            />
          </div>
        )}
      </ThemeConsumer>
    </AppbarContainer>
  );
};

export default AppBar;
