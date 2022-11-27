import React from "react";
import { IPhoto } from "../../redux/api/types";
import styled from "styled-components";

type Props = {
  photo: IPhoto;
};

const SingleImagePhotos = ({ photo }: Props) => {
  return (
    <ImageContainer>
      <img
        src={`https://picsum.photos/id/${Math.floor(
          Math.random() * 100
        )}/3000/3000`}
      />
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
