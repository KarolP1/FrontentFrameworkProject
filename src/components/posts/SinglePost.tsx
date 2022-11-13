import React, { useEffect, useState } from "react";
import { useGetAllCommentsQuery, useGetUsersQuery } from "../../redux/api";
import { IComent, IPost, IUser } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { increment } from "../../redux/slices/Posts/Posts.slice";
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
} from "./SinglePost.styled";
import comentIcon from "../../assets/icons/message.svg";

const SinglePost = ({ post }: { post: IPost }) => {
  const dispatch = useAppDispatch();

  const { idsOfLikedPosts, numberOfLikes } = useAppSelector(
    (state) => state.Posts
  );
  const { data } = useGetAllCommentsQuery();
  const usersData = useGetUsersQuery();
  const [coments, setComents] = useState<IComent[] | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

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
  useEffect(() => {
    if (idsOfLikedPosts?.includes(post.id)) setIsLiked(true);
    else setIsLiked(false);
  }, [idsOfLikedPosts, post.id]);
  return (
    <SinglePostContainer>
      <PostContext>
        <img
          alt="randomimagetopost"
          src={`https://picsum.photos/id/${post.id}/300/300`}
        />
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
          <PostDescritpion>{user?.username}</PostDescritpion>
          <PostDescritpion>{post.body}</PostDescritpion>
        </PostParts>
      </PostContext>
      <IconsContainer onClick={() => dispatch(increment({ id: post.id }))}>
        <div
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#ffffff25",
            borderRadius: 100,
            padding: ".5rem",
          }}
        >
          {isLiked ? (
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
              />
            </svg>
          )}
        </div>
      </IconsContainer>
    </SinglePostContainer>
  );
};

export default SinglePost;
