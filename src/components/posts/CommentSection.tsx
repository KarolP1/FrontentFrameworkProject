import React from "react";

const CommentSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        overflow: "scroll",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

export default CommentSection;
