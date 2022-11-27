import { useEffect, useState } from "react";
import ListOfPosts from "../../components/posts/ListOfPosts";
import ListOfAlbums from "../../components/posts/ListOfAlbums";
import ImageAlbumMenu from "../../components/profile/ImageAlbumMenu";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import {
  useGetAllAlbumsQuery,
  useGetAllCommentsQuery,
  useGetAllPhotosQuery,
  useGetAllPostsQuery,
} from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setComments } from "../../redux/slices/Coments/Coments.slice";
import {
  setAlbums,
  setImages,
  setPhotos,
  setPosts,
} from "../../redux/slices/Posts/Posts.slice";

const Homepage = () => {
  const { posts, albums, photos } = useAppSelector((state) => state.Posts);
  const coments = useAppSelector((state) => state.Comments.comment);

  const postResponse = useGetAllPostsQuery();
  const comentResponse = useGetAllCommentsQuery();
  const photoResponse = useGetAllPhotosQuery();

  const dispatch = useAppDispatch();

  const [imagesState, setImagesState] = useState<
    { id: number; image: string }[]
  >([]);

  const renderImagesArray = async () => {
    let imageArray: { id: number; image: string }[] = [];
    for (let index = 0; index < 100; index++) {
      const newImagesArr = {
        id: index,
        image: `https://picsum.photos/id/${index}/300/300`,
      };
      imageArray.push(newImagesArr);
    }
    return imageArray;
  };

  useEffect(() => {
    renderImagesArray().then((val) => setImagesState(val));
  }, []);

  const albumResponse = useGetAllAlbumsQuery();

  useEffect(() => {
    if (imagesState && imagesState.length === 100) {
      dispatch(setImages(imagesState));
    }
  }, [imagesState, dispatch]);

  useEffect(() => {
    if (!albums && albumResponse.data) {
      dispatch(setAlbums(albumResponse.data));
    }
  }, [albumResponse, albums, dispatch]);
  useEffect(() => {
    if (!photos && photoResponse.data) {
      dispatch(setPhotos(photoResponse.data));
    }
  }, [photoResponse, photos, dispatch]);

  useEffect(() => {
    if (!posts && postResponse.data) {
      dispatch(setPosts(postResponse.data));
    }
  }, [postResponse, posts, dispatch]);

  useEffect(() => {
    if (!coments && comentResponse.data) {
      dispatch(setComments(comentResponse.data));
    }
  }, [comentResponse, coments, dispatch]);
  const [isPostsOnDisplay, setisPostsOnDisplay] = useState(true);

  return (
    <SignedInContainer>
      <ImageAlbumMenu
        setisPostsOnDisplay={setisPostsOnDisplay}
        isPostsOnDisplay={isPostsOnDisplay}
      />
      {posts && isPostsOnDisplay && <ListOfPosts />}
      {posts && !isPostsOnDisplay && <ListOfAlbums />}
    </SignedInContainer>
  );
};

export default Homepage;
