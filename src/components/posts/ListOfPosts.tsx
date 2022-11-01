import { IPost } from "../../redux/api/types";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ posts }: { posts: IPost[] }) => {
  return (
    <AllPostContainer>
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </AllPostContainer>
  );
};

export default ListOfPosts;
