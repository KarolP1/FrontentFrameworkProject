import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPostLikes } from "../../redux/slices/Posts/Posts.slice";
import SearchUser from "../ui/LoggedIn/SearchUser";
import SinglePost from "./SinglePost";
import { AllPostContainer } from "./SinglePost.styled";

const ListOfPosts = ({ posts, type }: { posts: IPost[]; type?: "profile" }) => {
  const dispatch = useAppDispatch();
  const { UserQueryId } = useAppSelector((state) => state.Posts);
  const [postToDisplay, setPostToDisplay] = useState(posts);
  const navigate = useNavigate();

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
      {type !== "profile" && <SearchUser isMoblie={true} type={type} />}
      <AllPostContainer>
        {postToDisplay.map((post) => {
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
