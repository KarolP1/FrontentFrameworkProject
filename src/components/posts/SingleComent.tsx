import React from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { IComent } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteComment } from "../../redux/slices/Coments/Coments.slice";
import {
  ComentContainer,
  ComentContent,
  ProfileImage,
} from "./SingleComent.styled";

type Props = { coment: IComent; postOwner: number };

const SingleComent = (props: Props) => {
  const loggedInUser = useAppSelector((state) => state.Users.loggedInUser);
  const dispatch = useAppDispatch();

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
      {(props.postOwner === loggedInUser?.id ||
        props.coment.email === loggedInUser?.email) && (
        <RiDeleteBack2Line
          color={"#ff0000"}
          size={15}
          onClick={() => {
            dispatch(deleteComment(props.coment.id));
          }}
        />
      )}
    </ComentContainer>
  );
};

export default SingleComent;
