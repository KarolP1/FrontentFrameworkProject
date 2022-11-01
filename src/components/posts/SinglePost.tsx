import React from "react";
import { IPost } from "../../redux/api/types";
import {
  PostContext,
  SinglePostContainer,
  PostParts,
  PostTitle,
  PostDescritpion,
} from "./SinglePost.styled";

const SinglePost = ({ post }: { post: IPost }) => {
  return (
    <SinglePostContainer>
      {post.userId}
      <PostContext>
        <img
          alt="randomimagetopost"
          src={`https://picsum.photos/id/${post.id}/300/300`}
        />
        <PostParts>
          <PostTitle>{post.title}</PostTitle>
          <PostDescritpion>{post.body}</PostDescritpion>
        </PostParts>
      </PostContext>
    </SinglePostContainer>
  );
};

export default SinglePost;
