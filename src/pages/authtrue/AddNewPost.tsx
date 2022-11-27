import React, { useEffect, useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
import CommentSection from "../../components/posts/CommentSection";
import {
  AddPostButton,
  AddPostInput,
  InputLikeDiv,
} from "../../components/posts/SinglePost.styled";
import {
  ContentContainer,
  Description,
  PostContainer,
  Title,
} from "../../components/posts/SinglePostImageDisplay.styled";
import ImageAlbumMenu from "../../components/profile/ImageAlbumMenu";
import Spinner from "../../components/ui/loading";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { useCreatePostMutation } from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addImageToAlbum,
  addNewPost,
  addPostLike,
} from "../../redux/slices/Posts/Posts.slice";

type Props = {};

export const initialPost = {
  title: "",
  body: "",
};

const AddNewPost = (props: Props) => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.Users);
  const [createPost, { isLoading, data }] = useCreatePostMutation();
  const navigate = useNavigate();

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
      navigate(`/profile/${loggedInUser?.username}`);
    }
  }, [data, dispatch, loggedInUser, navigate]);
  const [isPostsOnDisplay, setisPostsOnDisplay] = useState(true);

  const albums = useAppSelector((state) => state.Posts.albums);
  const yourAlbums = albums?.filter(
    (album) => album.userId === loggedInUser?.id
  );

  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [isScrollOpen, setIsScrollOpen] = useState(false);

  return (
    <SignedInContainer>
      <PostContainer>
        <>
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
                <ImageAlbumMenu
                  setisPostsOnDisplay={setisPostsOnDisplay}
                  isPostsOnDisplay={isPostsOnDisplay}
                />
                {isPostsOnDisplay ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Title>Title:</Title>
                    <AddPostInput
                      placeholder="title"
                      onChange={(e) => {
                        if (!post) setPost(initialPost);
                        setPost({ ...post, title: e.target.value });
                      }}
                      value={post.title}
                    />
                    <Title>Album:</Title>
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <InputLikeDiv
                        onClick={() => setIsScrollOpen(!isScrollOpen)}
                      >
                        {selectedAlbum}
                      </InputLikeDiv>

                      <ThemeConsumer>
                        {(theme) => (
                          <div
                            style={{
                              position: "absolute",
                              backgroundColor: `${theme.color.medium}`,
                              width: "100%",
                              borderRadius: "1rem",
                              overflow: "scroll",
                              maxHeight: "50%",
                            }}
                          >
                            {yourAlbums &&
                              isScrollOpen &&
                              yourAlbums.map((album) => (
                                <div
                                  key={album.id + album.title}
                                  onClick={() => {
                                    setSelectedAlbum(album.title);
                                    setIsScrollOpen(false);
                                  }}
                                >
                                  <InputLikeDiv>{album.title}</InputLikeDiv>
                                </div>
                              ))}
                          </div>
                        )}
                      </ThemeConsumer>
                    </div>

                    <AddPostButton
                      onClick={() => {
                        if (isPostsOnDisplay) {
                          const randomImage = Math.floor(Math.random() * 1000);
                          if (loggedInUser) {
                            createPost({
                              ...post,
                              id: randomImage,
                              userId: loggedInUser.id,
                            });
                            setPost(initialPost);
                          }
                        } else {
                          const album = albums?.filter(
                            (albumstate) => albumstate.title === selectedAlbum
                          )[0];
                          if (album && post.title.length > 0) {
                            dispatch(
                              addImageToAlbum({
                                albumId: album.id,
                                id: Math.floor(Math.random() * 1000),
                                title: post.title,
                              })
                            );
                            navigate(`/albums/view/${album.id}`);
                          }
                        }
                      }}
                    >
                      Add image to album
                    </AddPostButton>
                  </>
                )}
              </CommentSection>
            )}
          </ContentContainer>
        </>
      </PostContainer>
    </SignedInContainer>
  );
};

export default AddNewPost;
