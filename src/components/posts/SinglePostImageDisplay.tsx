import React, { useEffect, useState } from "react";
import { useGetAllCommentsQuery } from "../../redux/api";
import { IComent, IPost } from "../../redux/api/types";
import Spinner from "../ui/loading";
import AddComentSection from "./AddComentSection";
import CommentSection from "./CommentSection";
import SingleComent from "./SingleComent";
import {
  ContentContainer,
  Description,
  PostContainer,
  Title,
} from "./SinglePostImageDisplay.styled";

const SinglePostImageDisplay = ({ post }: { post: IPost }) => {
  const [coments, setComents] = useState<IComent[] | null>(null);
  const { data } = useGetAllCommentsQuery();
  const [newComent, setNewComent] = useState<IComent | null>(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const filteredComents = data.filter(
        (coment) => coment.postId === post.id
      );
      setComents(filteredComents);
    }
  }, [data, post.id, post.userId]);

  return (
    <PostContainer>
      <div style={{ display: "flex", flex: 1 }}>
        <img
          alt={`large post  ${post.id}`}
          src={`https://picsum.photos/id/${post.id}/3000/3000`}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <ContentContainer>
        <Title>{post.title}</Title>
        <Description>{post.body}.</Description>
        {isLoading ? (
          <Spinner />
        ) : (
          <CommentSection postId={post.id}>
            {coments ? (
              coments.map((coment) => (
                <SingleComent key={coment.id} coment={coment} />
              ))
            ) : (
              <div>Be first who leaved a coment.</div>
            )}
            {newComent && (
              <SingleComent key={newComent.id} coment={newComent} />
            )}
          </CommentSection>
        )}
        <AddComentSection
          postId={post.id}
          setNewComent={(coment: IComent) => {
            setNewComent(coment);
          }}
          setIsLoading={(isLoading: boolean) => setisLoading(isLoading)}
        />
      </ContentContainer>
    </PostContainer>
  );
};

export default SinglePostImageDisplay;
