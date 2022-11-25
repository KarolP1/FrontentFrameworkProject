import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePostImageDisplay from "../../components/posts/SinglePostImageDisplay";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { useGetAllPostsQuery } from "../../redux/api";
import { IPost } from "../../redux/api/types";

const SingleImage = () => {
  const PicturesData = useGetAllPostsQuery();
  const posts = PicturesData.data;
  const { imageId } = useParams();
  const [singlePost, setSinglePost] = useState<IPost | null>(null);
  useEffect(() => {
    if (imageId && posts) {
      const singlePost = posts.filter(
        (post) => post.id === parseInt(imageId)
      )[0];
      if (singlePost) setSinglePost(singlePost);
    }
  }, [imageId, posts]);

  return (
    <SignedInContainer type="Profile">
      {singlePost ? (
        <SinglePostImageDisplay post={singlePost} />
      ) : (
        <div> there is nothing to show there </div>
      )}
    </SignedInContainer>
  );
};

export default SingleImage;
