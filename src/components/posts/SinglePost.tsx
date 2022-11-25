import React, { useEffect, useState } from "react";
import { useGetAllCommentsQuery, useGetUsersQuery } from "../../redux/api";
import { IComent, IPost, IUser } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { increment } from "../../redux/slices/Posts/Posts.slice";
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
  DeleteAction,
}: {
  post: IPost;
  onClick: () => void;
  DeleteAction: (postId: number) => void;
}) => {
  const dispatch = useAppDispatch();
  const loggedInUser = sessionStorage.getItem("loggedInId");
  const isYourPost = loggedInUser && parseInt(loggedInUser) === post.userId;

  const { idsOfLikedPosts, numberOfLikes } = useAppSelector(
    (state) => state.Posts
  );
  const { data } = useGetAllCommentsQuery();
  const usersData = useGetUsersQuery();
  const [coments, setComents] = useState<IComent[] | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const signedInUserId = sessionStorage.getItem("loggedInId");

  useEffect(() => {
    if (data) {
      const filteredComents = data.filter(
        (coment) => coment.postId === post.id
      );
      setComents(filteredComents);
    }
    if (usersData.data) {
      const singleUser = usersData.data.filter(
        (user) => user.id === post.userId
      )[0];
      setUser(singleUser);
    }
  }, [data, post.id, usersData.data, post.userId]);

  const postNumberOfLikes = numberOfLikes?.filter(
    (i) => i.postId === post.id
  )[0];
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [animatedBool, setanimatedBool] = useState<boolean>(false);
  const imageSource = `https://picsum.photos/id/${Math.floor(
    Math.random() * 100
  )}/300/300`;
  useEffect(() => {
    if (idsOfLikedPosts?.includes(post.id)) setIsLiked(true);
    else setIsLiked(false);
  }, [idsOfLikedPosts, post.id]);
  return (
    <SinglePostContainer>
      <PostContext onClick={onClick}>
        <img alt="randomimagetopost" src={imageSource} />
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
            {signedInUserId && parseInt(signedInUserId) === post.userId
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
