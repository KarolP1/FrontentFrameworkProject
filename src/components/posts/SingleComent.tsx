import React from "react";
import { IComent } from "../../redux/api/types";
import {
  ComentContainer,
  ComentContent,
  ProfileImage,
} from "./SingleComent.styled";

type Props = { coment: IComent };

const SingleComent = (props: Props) => {
  return (
    <ComentContainer>
      <ProfileImage
        src={`https://picsum.photos/id/${Math.floor(
          Math.random() * 100 + 10
        )}/300/300`}
      />
      <ComentContent>
        <p>{props.coment.email}</p>
        <p>{props.coment.body}</p>
      </ComentContent>
    </ComentContainer>
  );
};

export default SingleComent;
