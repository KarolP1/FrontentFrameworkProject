import { IPost } from "../../redux/api/types";
import { useAppDispatch } from "../../redux/hooks";
import { setPostLikes } from "../../redux/slices/Posts/Posts.slice";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ posts }: { posts: IPost[] }) => {
  const dispatch = useAppDispatch();
  return (
    <AllPostContainer>
      {posts.map((post) => {
        dispatch(
          setPostLikes({
            postid: post.id,
            numberOfLikes: Math.random() * 1000,
          })
        );
        return <SinglePost key={post.id} post={post} />;
      })}
    </AllPostContainer>
  );
};

export default ListOfPosts;
