import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListOfPosts from "../../components/posts/ListOfPosts";
import UserProfileSection from "../../components/profile/UserProfileSection";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { useGetAllPostsQuery, useGetUsersQuery } from "../../redux/api";
import { IPost, IUser } from "../../redux/api/types";

const ProfilePage = () => {
  const { userName } = useParams();
  const { data } = useGetUsersQuery();

  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    if (data) {
      const filteredUser = data.filter((user) => user.username === userName)[0];
      setUser(filteredUser);
    }
  }, [data, userName]);

  const PicturesData = useGetAllPostsQuery();
  const posts = PicturesData.data;

  const [userPosts, setUserPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const filteredPosts = posts?.filter((post) => post.userId === user?.id);
    if (filteredPosts) {
      setUserPosts(filteredPosts);
    }
  }, [posts, user?.id]);

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
          <div>
            <UserProfileSection user={user} />
            {userPosts && <ListOfPosts posts={userPosts} type={"profile"} />}
          </div>
        )}
      </div>
    </SignedInContainer>
  );
};

export default ProfilePage;
