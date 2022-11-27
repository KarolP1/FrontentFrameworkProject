import React from "react";
import { IAlbum, IPhoto } from "../../redux/api/types";
import styled from "styled-components";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deletePhoto } from "../../redux/slices/Posts/Posts.slice";
import { Link } from "react-router-dom";

type Props = {
  photo: IPhoto;
  album: IAlbum | null;
};

const SingleImagePhotos = ({ photo, album }: Props) => {
  const dispatch = useAppDispatch();
  const deleteImage = () => {
    dispatch(deletePhoto(photo.id));
  };
  const lggedInUser = useAppSelector((state) => state.Users.loggedInUser);
  return (
    <ImageContainer>
      {lggedInUser?.id === album?.userId && (
        <RiDeleteBin3Line
          size={20}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
          color={"#fff"}
          onClick={deleteImage}
        />
      )}
      <img
        alt="by user"
        src={`https://picsum.photos/id/${Math.floor(
          Math.random() * 100
        )}/3000/3000`}
      />
      <Link
        style={{ textDecoration: "none", color: "#44aaff", marginTop: "1rem" }}
        to={`/albums/view/${album?.id}`}
      >
        {album?.title}
      </Link>

      <div>{photo.title}</div>
    </ImageContainer>
  );
};

export default SingleImagePhotos;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  align-items: center;
  flex: 1;
  aspect-ratio: 0.8;
  border-radius: 1rem;
  -webkit-box-shadow: 0 2px 25px -4px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0 2px 25px -4px rgba(0, 0, 0, 1);
  box-shadow: 0 2px 25px -4px rgba(0, 0, 0, 1);
  position: relative;

  Link {
    text-decoration: none;
    text-transform: capitalize;
    color: #fff;
  }

  img {
    width: 100%;
    border-radius: 1rem;
    -webkit-box-shadow: 8px 12px 25px -22px rgba(0, 0, 0, 1);
    -moz-box-shadow: 8px 12px 25px -22px rgba(0, 0, 0, 1);
    box-shadow: 8px 12px 25px -22px rgba(0, 0, 0, 1);
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    color: #fff;
    text-transform: capitalize;
  }
`;
