import React, { useEffect, useState } from "react";
import { IPost } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { increment } from "../../redux/slices/Posts/Posts.slice";
import {
  PostContext,
  SinglePostContainer,
  PostParts,
  PostTitle,
  PostDescritpion,
  IconsContainer,
} from "./SinglePost.styled";

const SinglePost = ({ post }: { post: IPost }) => {
  const dispatch = useAppDispatch();
  const { idsOfLikedPosts, numberOfLikes } = useAppSelector(
    (state) => state.Posts
  );
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
          <p>{postNumberOfLikes?.numberOfLikes.toFixed()}</p>
          <PostTitle>{post.title}</PostTitle>
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
          {isLiked}
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
        </div>
      </IconsContainer>
    </SinglePostContainer>
  );
};

export default SinglePost;
