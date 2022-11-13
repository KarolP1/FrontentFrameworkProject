import { useEffect } from "react";
import { IPost } from "../../redux/api/types";
import { useAppDispatch } from "../../redux/hooks";
import { setPostLikes } from "../../redux/slices/Posts/Posts.slice";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ posts }: { posts: IPost[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const postLikes = posts.map((post) => {
      return { postId: post.id, numberOfLikes: Math.random() * 1000 };
    });
    dispatch(setPostLikes(postLikes));
  }, [posts, dispatch]);

  return (
    <AllPostContainer>
      {posts.map((post) => {
        return <SinglePost key={post.id} post={post} />;
      })}
    </AllPostContainer>
  );
};

export default ListOfPosts;
