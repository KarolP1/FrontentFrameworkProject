import React from "react";

const CommentSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        overflow: "scroll",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default CommentSection;
