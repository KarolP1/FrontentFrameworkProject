import React, { useEffect, useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import CommentSection from "../../components/posts/CommentSection";
import {
  AddPostButton,
  AddPostInput,
} from "../../components/posts/SinglePost.styled";
import {
  ContentContainer,
  Description,
  PostContainer,
  Title,
} from "../../components/posts/SinglePostImageDisplay.styled";
import Spinner from "../../components/ui/loading";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { useCreatePostMutation } from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNewPost, addPostLike } from "../../redux/slices/Posts/Posts.slice";

type Props = {};

export const initialPost = {
  title: "",
  body: "",
};

const AddNewPost = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.Users);
  const [createPost, { isLoading, data }] = useCreatePostMutation();

  const [post, setPost] = useState<{
    title: string;
    body: string;
  }>(initialPost);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newImageState, setNewImageState] = useState<any>();
  useEffect(() => {
    if (newImageState) {
      setImageUrl(URL.createObjectURL(newImageState));
    }
  }, [newImageState]);

  const inputFile = useRef(null);
  const onButtonClick = () => {
    //@ts-ignore
    inputFile.current?.click();
  };

  useEffect(() => {
    const newId = Math.floor(Math.random() * 1000);

    if (data) {
      dispatch(
        addNewPost({
          title: data.title ? data.title : "",
          body: data.body ? data.body : "",
          id: newId,
          userId: loggedInUser ? loggedInUser.id : 0,
        })
      );
      dispatch(addPostLike({ postId: newId }));

      setPost(initialPost);
    }
  }, [data, dispatch, loggedInUser]);

  return (
    <SignedInContainer>
      <PostContainer>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onButtonClick}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Dupa"
                style={{
                  objectFit: "cover",
                  display: "flex",
                  alignSelf: "center",
                  width: "100%",
                  aspectRatio: 1,
                }}
              />
            ) : (
              <RiImageAddLine size={200} color={"#fff"} />
            )}
            <input
              ref={inputFile}
              type="file"
              style={{ display: "none" }}
              // @ts-ignore
              onChange={(e) => setNewImageState(e.target.files[0])}
            />
          </div>
        </div>
        <ContentContainer>
          {isLoading ? (
            <Spinner />
          ) : (
            <CommentSection>
              <Title>Title:</Title>
              <AddPostInput
                placeholder="title"
                onChange={(e) => {
                  if (!post) setPost(initialPost);
                  setPost({ ...post, title: e.target.value });
                }}
                value={post.title}
              />
              <Description>Description</Description>
              <AddPostInput
                placeholder="description"
                onChange={(e) => {
                  if (!post) setPost(initialPost);
                  setPost({ ...post, body: e.target.value });
                }}
                value={post.body}
              />

              <AddPostButton
                onClick={() => {
                  const randomImage = Math.floor(Math.random() * 1000);
                  if (loggedInUser) {
                    createPost({
                      ...post,
                      id: randomImage,
                      userId: loggedInUser.id,
                    });
                    setPost(initialPost);
                  }
                }}
              >
                Submit new Post
              </AddPostButton>
            </CommentSection>
          )}
        </ContentContainer>
      </PostContainer>
    </SignedInContainer>
  );
};

export default AddNewPost;
