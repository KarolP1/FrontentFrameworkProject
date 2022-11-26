import React, { useEffect, useState } from "react";
import { IComent, IPost, IUser } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { increment, setPosts } from "../../redux/slices/Posts/Posts.slice";
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin3Line } from "react-icons/ri";
import {
  PostContext,
  SinglePostContainer,
  PostParts,
  PostTitle,
  PostDescritpion,
  IconsContainer,
  SingleIconContainer,
  IconWithText,
  AllIconContainer,
  PostUserLink,
  IconMoreOptions,
  MoreIconsDisplay,
} from "./SinglePost.styled";
import comentIcon from "../../assets/icons/message.svg";

const SinglePost = ({
  post,
  onClick,
}: {
  post: IPost;
  onClick: () => void;
}) => {
  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector((state) => state.Users.loggedInUser);
  const isYourPost = loggedInUser?.id === post.userId;

  const { idsOfLikedPosts, numberOfLikes, images, posts } = useAppSelector(
    (state) => state.Posts
  );
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (images) {
      const singleImage = images.filter((image) => image.id === post.id)[0];
      if (singleImage) setImage(singleImage?.image);
      else {
        setImage(images[0].image);
      }
    }
  }, [images, post.id]);
  const comments = useAppSelector((state) => state.Comments.comment);
  const usersData = useAppSelector((state) => state.Users.users);
  const [coments, setComents] = useState<IComent[] | null>(null);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (comments) {
      const filteredComents = comments.filter(
        (coment) => coment.postId === post.id
      );
      setComents(filteredComents);
    }
    if (usersData) {
      const singleUser = usersData.filter((user) => user.id === post.userId)[0];
      setUser(singleUser);
    }
  }, [comments, post.id, usersData, post.userId]);

  const postNumberOfLikes = numberOfLikes?.filter(
    (i) => i.postId === post.id
  )[0];
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [animatedBool, setanimatedBool] = useState<boolean>(false);
  useEffect(() => {
    if (idsOfLikedPosts?.includes(post.id)) setIsLiked(true);
    else setIsLiked(false);
  }, [idsOfLikedPosts, post.id]);

  const DeleteAction = (postId: number) => {
    if (posts) {
      const filteredPosts = posts.filter((post) => postId !== post.id);
      dispatch(setPosts(filteredPosts));
    }
  };
  return (
    <SinglePostContainer>
      <PostContext>
        <img alt="randomimagetopost" src={image} onClick={onClick} />
        <PostParts>
          <AllIconContainer>
            <IconWithText>
              <SingleIconContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                  />
                </svg>
              </SingleIconContainer>
              <p>{postNumberOfLikes?.numberOfLikes.toFixed()}</p>
            </IconWithText>

            <IconWithText>
              <SingleIconContainer>
                <img
                  alt="icon"
                  style={{ height: "100%", width: "100%", color: "#fff" }}
                  src={comentIcon}
                />
              </SingleIconContainer>

              <p>{coments?.length.toFixed()}</p>
            </IconWithText>
          </AllIconContainer>

          <PostTitle>{post.title}</PostTitle>
          <PostUserLink to={`/profile/${user?.username}`}>
            {loggedInUser && loggedInUser.id === post.userId
              ? "Your's image"
              : user?.username}
          </PostUserLink>
          <PostDescritpion>{post.body}</PostDescritpion>
        </PostParts>
      </PostContext>
      <IconsContainer>
        <div
          onClick={() => dispatch(increment({ id: post.id }))}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#ffffff25",
            borderRadius: 100,
            padding: ".5rem",
          }}
        >
          {isLiked ? (
            <BsHeartFill size={20} color="#fff" />
          ) : (
            <BsHeart size={20} color="#fff" />
          )}
        </div>
        {isYourPost && (
          <div style={{ flexDirection: "column", display: "flex" }}>
            <IconMoreOptions
              active={animatedBool}
              onClick={() => {
                setanimatedBool(!animatedBool);
              }}
            >
              <BsThreeDotsVertical color="#fff" size={20} />
            </IconMoreOptions>
            <MoreIconsDisplay active={animatedBool}>
              <div onClick={() => DeleteAction(post.id)}>
                <RiDeleteBin3Line color="#fff" size={20} />
              </div>
              <div>
                <BsThreeDotsVertical color="#fff" size={20} />
              </div>
              <div>
                <BsThreeDotsVertical color="#fff" size={20} />
              </div>
            </MoreIconsDisplay>
          </div>
        )}
      </IconsContainer>
    </SinglePostContainer>
  );
};

export default SinglePost;
