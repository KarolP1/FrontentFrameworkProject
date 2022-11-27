import React, { useEffect, useState } from "react";
import { IPhoto } from "../../redux/api/types";
import { useAppSelector } from "../../redux/hooks";
import SingleImagePhotos from "./SingleImage";
import { AllPostContainer } from "./SinglePost.styled";

const SingleAlbumDisplay = ({ albumId }: { albumId: number }) => {
  const [photosstate, setphotosstate] = useState<IPhoto[] | null>(null);
  const { photos, albums } = useAppSelector((state) => state.Posts);
  const singleAlbum =
    albums && albums.filter((album) => album.id === albumId)[0];

  useEffect(() => {
    if (photos) {
      const filteredphotos = photos.filter(
        (photo) => photo.albumId === albumId
      );
      setphotosstate(filteredphotos);
    }
  }, [photos, albumId]);

  return (
    <AllPostContainer>
      {photosstate &&
        photosstate.map((photo) => (
          <SingleImagePhotos key={photo.id} photo={photo} album={singleAlbum} />
        ))}
    </AllPostContainer>
  );
};

export default SingleAlbumDisplay;
