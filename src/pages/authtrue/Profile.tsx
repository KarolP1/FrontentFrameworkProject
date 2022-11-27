import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListOfAlbums from "../../components/posts/ListOfAlbums";
import ListOfPosts from "../../components/posts/ListOfPosts";
import ImageAlbumMenu from "../../components/profile/ImageAlbumMenu";
import UserProfileSection from "../../components/profile/UserProfileSection";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { IPost, IUser } from "../../redux/api/types";
import { useAppSelector } from "../../redux/hooks";

const ProfilePage = () => {
  const { userName } = useParams();
  const data = useAppSelector((state) => state.Users.users);

  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (data) {
      const filteredUser = data.filter((user) => user.username === userName)[0];
      setUser(filteredUser);
    }
  }, [data, userName]);

  const posts = useAppSelector((state) => state.Posts.posts);

  const [userPosts, setUserPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const filteredPosts = posts?.filter((post) => post.userId === user?.id);
    if (filteredPosts) {
      setUserPosts(filteredPosts);
    }
  }, [posts, user?.id]);

  const [isPostsOnDisplay, setisPostsOnDisplay] = useState(true);

  return (
    <SignedInContainer type="Profile">
      <div
        style={{
          width: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!user && <p>User not found</p>}
        {user && (
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <UserProfileSection user={user} />
            <ImageAlbumMenu
              setisPostsOnDisplay={setisPostsOnDisplay}
              isPostsOnDisplay={isPostsOnDisplay}
            />
            {userPosts && isPostsOnDisplay ? (
              <ListOfPosts type={"profile"} />
            ) : (
              //
              <ListOfAlbums type={"profile"} />
            )}
          </div>
        )}
      </div>
    </SignedInContainer>
  );
};

export default ProfilePage;
