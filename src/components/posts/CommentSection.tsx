import React from "react";

const CommentSection = ({
  postId,
  children,
}: {
  postId: number;
  children: React.ReactNode;
}) => {
  return <div style={{ overflow: "scroll" }}>{children}</div>;
};

export default CommentSection;
