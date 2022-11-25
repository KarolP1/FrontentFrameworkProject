import React from "react";
import { Logo } from "../../../pages/authfalse/LoginPage";
import { AppbarContainer } from "./AppBar.styled";
import { BiLogOut, BiUser } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/slices/login.slice";
import SearchUser from "./SearchUser";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../redux/api";

const AppBar = ({ type }: { type?: "Profile" }) => {
  const userId = useAppSelector((state) => state.login.userId);
  const { data } = useGetUsersQuery();
  const loggedInUser = data?.filter((user) => user.id === userId)[0];
  const dispatch = useAppDispatch();
  return (
    <AppbarContainer>
      <Link to="/">
        <Logo height={30} align={"flex-start"} />
      </Link>
      <SearchUser type={type} />
      <ThemeConsumer>
        {(theme) => (
          <div>
            <BiLogOut
              className="icon"
              color={theme.color.tint}
              size={30}
              onClick={() => dispatch(logout())}
            />
            <Link to={`/profile/${loggedInUser?.username}`}>
              <BiUser className="icon" color={theme.color.tint} size={30} />
            </Link>
          </div>
        )}
      </ThemeConsumer>
    </AppbarContainer>
  );
};

export default AppBar;
