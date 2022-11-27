import React from "react";
import { MenuContainer, MenuElement } from "./ImageAlbumMenu.styled";

type Props = {
  isPostsOnDisplay: boolean;
  setisPostsOnDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageAlbumMenu = (props: Props) => {
  return (
    <MenuContainer>
      <MenuElement
        selected={props.isPostsOnDisplay}
        onClick={() => {
          props.setisPostsOnDisplay(true);
        }}
      >
        <p>Posts</p>
      </MenuElement>
      <MenuElement
        selected={!props.isPostsOnDisplay}
        onClick={() => {
          props.setisPostsOnDisplay(false);
        }}
      >
        <p>Albums</p>
      </MenuElement>
    </MenuContainer>
  );
};

export default ImageAlbumMenu;
