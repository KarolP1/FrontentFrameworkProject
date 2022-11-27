import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAlbum } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import albumIcon from "../../assets/icons/album.svg";
import { setUserQueryId } from "../../redux/slices/Posts/Posts.slice";
import SearchUser from "../ui/LoggedIn/SearchUser";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ type }: { type?: "profile" }) => {
  const dispatch = useAppDispatch();
  const { userName } = useParams();
  const users = useAppSelector((state) => state.Users.users);

  useEffect(() => {
    if (userName) {
      const singleUser = users?.find((user) => user.username === userName);
      if (singleUser) dispatch(setUserQueryId({ id: singleUser?.id }));
      else dispatch(setUserQueryId({ id: null }));
    }
  }, [userName, dispatch, users]);

  const [albumsToDisplay, setAlbumsToDisplay] = useState<null | IAlbum[]>(null);
  const { albums, UserQueryId } = useAppSelector((state) => state.Posts);

  const navigate = useNavigate();

  useEffect(() => {
    if (UserQueryId) {
      const filteredAlbums = albums?.filter(
        (post) => post.userId === UserQueryId
      );
      if (filteredAlbums) setAlbumsToDisplay(filteredAlbums);
    } else {
      setAlbumsToDisplay(albums);
    }
  }, [UserQueryId, albums]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {type !== "profile" && <SearchUser isMoblie={true} type={type} />}
      <AllPostContainer>
        {albumsToDisplay?.map((album) => {
          return (
            <Container
              key={album.id}
              onClick={() => navigate(`/albums/view/${album.id}`)}
            >
              <img
                style={{ width: "100px", aspectRatio: 1 }}
                src={albumIcon}
                alt="albumIcon"
              />
              <Title>{album.title}</Title>
            </Container>
          );
        })}
      </AllPostContainer>
    </div>
  );
};

export const Title = styled.p`
  color: #fff;
  text-align: center;
  text-transform: capitalize;
  font-size: 1.2rem;
`;
export const Container = styled.div`
  color: #fff;
  text-align: center;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  cursor: pointer;
`;

export default ListOfPosts;
