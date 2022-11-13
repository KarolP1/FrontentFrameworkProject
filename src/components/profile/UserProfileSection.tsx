import React from "react";
import { IUser } from "../../redux/api/types";
import {
  Info,
  MainContainer,
  ProfileImg,
  ProfileInfoContainer,
} from "./UserProfileSection.styled";

const UserProfileSection: React.FC<{ user: IUser }> = ({ user }) => {
  const imageURI = "https://picsum.photos/200";
  return (
    <MainContainer>
      <ProfileInfoContainer>
        <ProfileImg src={imageURI} alt="profileImage" />
        <Info>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <p>{user.address.city}</p>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.zipcode}</p>
        </Info>
      </ProfileInfoContainer>
    </MainContainer>
  );
};

export default UserProfileSection;
