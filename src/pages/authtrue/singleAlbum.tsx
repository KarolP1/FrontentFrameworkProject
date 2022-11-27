import React from "react";
import { useParams } from "react-router-dom";
import SingleAlbumDisplay from "../../components/posts/SingleAlbumDisplay";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";

const SingleAlbum = () => {
  const { albumId } = useParams();

  return (
    <SignedInContainer type="Profile">
      {albumId ? (
        <SingleAlbumDisplay albumId={parseInt(albumId)} />
      ) : (
        <div> there is nothing to show there </div>
      )}
    </SignedInContainer>
  );
};

export default SingleAlbum;
