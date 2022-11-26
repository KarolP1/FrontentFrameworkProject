import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPost } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setPostLikes,
  setUserQueryId,
} from "../../redux/slices/Posts/Posts.slice";
import SearchUser from "../ui/LoggedIn/SearchUser";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ type }: { type?: "profile" }) => {
  const dispatch = useAppDispatch();
  const { userName } = useParams();
  const users = useAppSelector((state) => state.Users.users);

  useEffect(() => {
    if (userName) {
      const singleUser = users?.find((user) => user.username === userName);
      if (singleUser) dispatch(setUserQueryId({ id: singleUser?.id }));
      else dispatch(setUserQueryId({ id: null }));
    }
  }, [userName, dispatch, users]);

  const [postToDisplay, setPostToDisplay] = useState<null | IPost[]>(null);
  const { posts, UserQueryId, numberOfLikes } = useAppSelector(
    (state) => state.Posts
  );

  console.log({ UserQueryId, userName });
  const navigate = useNavigate();

  useEffect(() => {
    const postLikes = posts?.map((post) => {
      return { postId: post.id, numberOfLikes: Math.random() * 1000 };
    });
    if (!numberOfLikes && postLikes) dispatch(setPostLikes(postLikes));
  }, [posts, dispatch, numberOfLikes]);

  useEffect(() => {
    if (UserQueryId) {
      const filteredPosts = posts?.filter(
        (post) => post.userId === UserQueryId
      );
      if (filteredPosts) setPostToDisplay(filteredPosts);
    } else {
      setPostToDisplay(posts);
    }
  }, [UserQueryId, posts]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {type !== "profile" && <SearchUser isMoblie={true} type={type} />}
      <AllPostContainer>
        {postToDisplay?.map((post) => {
          return (
            <SinglePost
              post={post}
              key={post.id}
              onClick={() => {
                navigate(`/image/view/${post.id}`);
              }}
            />
          );
        })}
      </AllPostContainer>
    </div>
  );
};

export default ListOfPosts;
