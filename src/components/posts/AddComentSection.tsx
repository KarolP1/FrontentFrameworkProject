import React, { useState } from "react";
import { ComentPostContainer } from "./AddComentSection.styled";
import { HiChat } from "react-icons/hi";
import { ThemeConsumer } from "styled-components";
import { useCreateComentMutation, useGetUsersQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { IComent } from "../../redux/api/types";

type Props = {
  postId: number;
  setNewComent: (coment: IComent) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const AddComentSection = (props: Props) => {
  const [createPost, { isLoading, data }] = useCreateComentMutation();

  useEffect(() => {
    if (data) {
      props.setNewComent(data);
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      props.setIsLoading(isLoading);
    }
  }, [isLoading]);
  const userId = useAppSelector((state) => state.login.userId);
  const user = useGetUsersQuery();
  const loggedInUser = user.data?.filter((user) => user.id === userId)[0];

  const [textMessage, setTextMessage] = useState("");
  return (
    <ComentPostContainer>
      <input
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />
      <ThemeConsumer>
        {(theme) => (
          <button
            onClick={() => {
              createPost({
                coment: {
                  name: loggedInUser?.username,
                  body: textMessage,
                  email: loggedInUser
                    ? loggedInUser.email
                    : "not logged in user",
                  postId: props.postId,
                },
                postId: props.postId,
              });
              setTextMessage("");
            }}
          >
            <HiChat
              style={{ height: "100%", width: "100%" }}
              color={theme.color.lightest}
            />
          </button>
        )}
      </ThemeConsumer>
    </ComentPostContainer>
  );
};

export default AddComentSection;
