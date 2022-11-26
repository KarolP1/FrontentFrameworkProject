import React, { useEffect, useState } from "react";
import { IComent, IPost } from "../../redux/api/types";
import { useAppSelector } from "../../redux/hooks";
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
  const [isLoading, setisLoading] = useState(false);
  const data = useAppSelector((state) => state.Comments.comment);

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
          <CommentSection>
            {coments ? (
              coments.map((coment) => (
                <SingleComent
                  key={coment.id}
                  coment={coment}
                  postOwner={post.userId}
                />
              ))
            ) : (
              <div>Be first who leaved a coment.</div>
            )}
          </CommentSection>
        )}
        <AddComentSection
          postId={post.id}
          setIsLoading={(isLoading: boolean) => setisLoading(isLoading)}
        />
      </ContentContainer>
    </PostContainer>
  );
};

export default SinglePostImageDisplay;
