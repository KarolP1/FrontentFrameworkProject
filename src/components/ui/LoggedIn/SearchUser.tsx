import React, { useEffect, useState } from "react";
import { Container, DisplayNames, SearchContainer } from "./SearchUser.styled";
import { BiSearchAlt } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import { setUserQueryId } from "../../../redux/slices/Posts/Posts.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

const SearchUser = ({
  isMoblie,
  type,
}: {
  isMoblie?: boolean;
  type?: "Profile";
}) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [userSearch, setUserSearch] = useState("");
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const data = useAppSelector((state) => state.Users.users);
  const [usersToDisplay, setUsersToDisplay] = useState(data);

  useEffect(() => {
    if (userSearch.length > 0) {
      setIsVisibleMenu(true);
    } else {
      dispatch(setUserQueryId({ id: null }));
      setIsVisibleMenu(false);
    }
  }, [userSearch, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisibleMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (userSearch.length === 0) {
      setUsersToDisplay(data);
    } else {
      const filter = data?.filter((user) => {
        if (user.username.toLowerCase().includes(userSearch.toLowerCase())) {
          return true;
        }
        return false;
      });
      if (filter) setUsersToDisplay(filter);
    }
  }, [data, userSearch]);

  const ref = useOutsideClick(() => setIsVisibleMenu(false));

  return (
    <Container>
      <SearchContainer
        ref={ref}
        isMoblie={isMoblie}
        onClick={() => {
          setIsVisibleMenu(true);
        }}
      >
        <ThemeConsumer>
          {(theme) => {
            return <BiSearchAlt color={theme.color.darkTint} />;
          }}
        </ThemeConsumer>
        <input
          type="text"
          value={userSearch}
          onChange={(e) => {
            setUserSearch(e.target.value);
          }}
        />
      </SearchContainer>
      <DisplayNames isVisible={isVisibleMenu}>
        {usersToDisplay?.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              if (type === "Profile") {
                navigation(`/profile/${user.username}`);
                setUserSearch("");
              } else {
                setUserSearch(user.username);
                setIsVisibleMenu(false);
                dispatch(setUserQueryId({ id: user.id }));
              }
            }}
          >
            {user.username}
          </div>
        ))}
      </DisplayNames>
    </Container>
  );
};

export default SearchUser;
