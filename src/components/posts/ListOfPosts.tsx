import { useEffect, useState } from "react";
import { IPost } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPostLikes } from "../../redux/slices/Posts/Posts.slice";
import SearchUser from "../ui/LoggedIn/SearchUser";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ posts }: { posts: IPost[] }) => {
  const dispatch = useAppDispatch();
  const { UserQueryId } = useAppSelector((state) => state.Posts);
  const [postToDisplay, setPostToDisplay] = useState(posts);
  useEffect(() => {
    const postLikes = posts.map((post) => {
      return { postId: post.id, numberOfLikes: Math.random() * 1000 };
    });
    dispatch(setPostLikes(postLikes));
  }, [posts, dispatch]);

  useEffect(() => {
    if (UserQueryId) {
      const filteredPosts = posts.filter((post) => post.userId === UserQueryId);
      setPostToDisplay(filteredPosts);
    } else {
      setPostToDisplay(posts);
    }
  }, [UserQueryId, posts]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SearchUser isMoblie={true} />
      <AllPostContainer>
        {postToDisplay.map((post) => {
          return <SinglePost key={post.id} post={post} />;
        })}
      </AllPostContainer>
    </div>
  );
};

export default ListOfPosts;
