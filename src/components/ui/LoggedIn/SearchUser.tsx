import React, { useEffect, useState } from "react";
import { DisplayNames, SearchContainer } from "./SearchUser.styled";
import { BiSearchAlt } from "react-icons/bi";
import { ThemeConsumer } from "styled-components";
import { useGetUsersQuery } from "../../../redux/api";
import { setUserQueryId } from "../../../redux/slices/Posts/Posts.slice";
import { useAppDispatch } from "../../../redux/hooks";

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const [userSearch, setUserSearch] = useState("");
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const { data } = useGetUsersQuery();
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
    if (userSearch.length === 0) {
      setUsersToDisplay(data);
    } else {
      const filter = data?.filter((user) => {
        if (user.username.toLowerCase().includes(userSearch.toLowerCase())) {
          return true;
        }
        return false;
      });
      setUsersToDisplay(filter);
    }
  }, [data, userSearch]);

  return (
    <div style={{ position: "relative", zIndex: 10, width: "25%" }}>
      <SearchContainer
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
              setUserSearch(user.username);
              setIsVisibleMenu(false);
              dispatch(setUserQueryId({ id: user.id }));
            }}
          >
            {user.username}
          </div>
        ))}
      </DisplayNames>
    </div>
  );
};

export default SearchUser;
