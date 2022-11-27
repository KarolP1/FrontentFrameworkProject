import React, { useEffect, useState } from "react";
import { IPhoto } from "../../redux/api/types";
import { useAppSelector } from "../../redux/hooks";
import SingleImagePhotos from "./SingleImage";
import { AllPostContainer } from "./SinglePost.styled";

const SingleAlbumDisplay = ({ albumId }: { albumId: number }) => {
  const [photos, setphotos] = useState<IPhoto[] | null>(null);
  const data = useAppSelector((state) => state.Posts.photos);

  useEffect(() => {
    if (data) {
      const filteredphotos = data.filter(
        (photos) => photos.albumId === albumId
      );
      setphotos(filteredphotos);
    }
  }, [data, albumId]);

  return (
    <AllPostContainer>
      {photos &&
        photos.map((photo) => (
          <SingleImagePhotos key={photo.id} photo={photo} />
        ))}
    </AllPostContainer>
  );
};

export default SingleAlbumDisplay;
