import React, { useState } from "react";
import { ComentPostContainer } from "./AddComentSection.styled";
import { HiChat } from "react-icons/hi";
import { ThemeConsumer } from "styled-components";
import { useCreateComentMutation } from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { addComment } from "../../redux/slices/Coments/Coments.slice";

type Props = {
  postId: number;
  setIsLoading: (isLoading: boolean) => void;
};

const AddComentSection = (props: Props) => {
  const [createPost, { isLoading, data }] = useCreateComentMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data)
      dispatch(addComment({ ...data, id: Math.floor(Math.random() * 10000) }));
  }, [data, dispatch]);

  useEffect(() => {
    props.setIsLoading(isLoading);
  }, [isLoading, props]);

  const loggedInUser = useAppSelector((state) => state.Users.loggedInUser);

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
                  email: loggedInUser ? loggedInUser.email : "",
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
