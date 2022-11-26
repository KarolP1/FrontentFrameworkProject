import React, { useEffect, useState } from "react";
import { RiEditFill, RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../redux/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editUser } from "../../redux/slices/Users/Users.slice";
import {
  Info,
  MainContainer,
  ProfileImg,
  ProfileInfoContainer,
} from "./UserProfileSection.styled";

const UserProfileSection: React.FC<{ user: IUser }> = ({ user }) => {
  const imageURI = "https://picsum.photos/200";
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [editUserState, seteditUserState] = useState(user);
  const loggedInUser = useAppSelector((state) => state.Users.loggedInUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditModeEnabled) dispatch(editUser(editUserState));
  }, [isEditModeEnabled, dispatch, editUserState]);

  useEffect(() => {
    if (loggedInUser?.username === editUserState.username) {
      navigate(`/profile/${loggedInUser?.username}`);
    }
  }, [loggedInUser, editUserState.username, navigate]);

  return (
    <MainContainer>
      <ProfileInfoContainer>
        {user.id === loggedInUser?.id && (
          <div
            style={{ position: "absolute", right: 10, top: 10 }}
            onClick={() => {
              setIsEditModeEnabled(!isEditModeEnabled);
            }}
          >
            {!isEditModeEnabled ? (
              <RiEditLine color={"#fff"} size={20} />
            ) : (
              <RiEditFill color={"#fff"} size={20} />
            )}
          </div>
        )}

        {!isEditModeEnabled && <ProfileImg src={imageURI} alt="profileImage" />}
        {!isEditModeEnabled ? (
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
        ) : (
          <Info>
            <input
              value={editUserState.name}
              onChange={(e) =>
                seteditUserState({ ...editUserState, name: e.target.value })
              }
            />
            <input
              value={editUserState.username}
              onChange={(e) =>
                seteditUserState({ ...editUserState, username: e.target.value })
              }
            />
            <input
              value={editUserState.email}
              onChange={(e) =>
                seteditUserState({ ...editUserState, email: e.target.value })
              }
            />
            <input
              value={editUserState.phone}
              onChange={(e) =>
                seteditUserState({ ...editUserState, phone: e.target.value })
              }
            />
            <input
              value={editUserState.website}
              onChange={(e) =>
                seteditUserState({ ...editUserState, website: e.target.value })
              }
            />
            <input
              value={editUserState.address.city}
              onChange={(e) =>
                seteditUserState({
                  ...editUserState,
                  address: { ...editUserState.address, city: e.target.value },
                })
              }
            />
            <input
              value={editUserState.address.street}
              onChange={(e) =>
                seteditUserState({
                  ...editUserState,
                  address: { ...editUserState.address, street: e.target.value },
                })
              }
            />
            <input
              value={editUserState.address.suite}
              onChange={(e) =>
                seteditUserState({
                  ...editUserState,
                  address: { ...editUserState.address, suite: e.target.value },
                })
              }
            />
            <input
              value={editUserState.address.zipcode}
              onChange={(e) =>
                seteditUserState({
                  ...editUserState,
                  address: {
                    ...editUserState.address,
                    zipcode: e.target.value,
                  },
                })
              }
            />
          </Info>
        )}
      </ProfileInfoContainer>
    </MainContainer>
  );
};

export default UserProfileSection;
