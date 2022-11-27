import { Link } from "react-router-dom";
import styled from "styled-components";

export const SinglePostContainer = styled.div`
  flex: 1;
  display: flex;
  margin: 1rem 10%;
  height: 100%;
  position: relative;
  padding-bottom: 2rem;
`;

export const PostContext = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${(props) => `2px 2px 12px ${props.theme.color.darkTint}`};
  img {
    width: 100%;
    aspect-ratio: 1;
    cursor: pointer;
  }
  height: 100%;
`;

export const AllPostContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const PostParts = styled.div`
  display: flex;
  padding: 1rem;
  flex-grow: 1;
  flex-direction: column;
`;

export const PostTitle = styled.p`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.color.lightest};
`;

export const PostDescritpion = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.color.tint};
  max-height: 50px;
  flex: 1;

  mask: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 95%
  );
`;
export const PostUserLink = styled(Link)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.color.tint};
  max-height: 50px;
  flex: 1;

  mask: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 95%
  );
`;

export const IconsContainer = styled.div`
  position: absolute;
  justify-content: space-between;
  display: flex;
  padding: 1rem;
  width: 100%;
`;
export const IconsContainerRight = styled.div`
  position: absolute;
  justify-content: flex-end;
  display: flex;
  padding: 1rem;
  background-color: #fff;
  right: 0;
  z-index: 10;
`;
export const SingleIconContainer = styled.div`
  height: 2rem;
  margin-right: 0.4rem;
`;

export const IconWithText = styled.div`
  display: flex;
  flex-direction: "row";
  background-color: #ffffff15;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  align-self: flex-start;
`;

export const AllIconContainer = styled.div`
  flex-direction: row;
  justify-content: space-around;
  display: flex;
`;

export const IconMoreOptions = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  background-color: #ffffff15;
  border-radius: 100px;
  padding: 0.5rem;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  transition: rotate 500ms;

  rotate: ${(props) => (props.active ? "3600deg" : "0deg")};
`;
export const MoreIconsDisplay = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  width: 30px;
  border-radius: 100px;
  padding: 0.5rem;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  transition: height 500ms;

  div {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    padding: 0.5rem;
    height: ${(props) => (props.active ? "30px" : "0px")};
    display: ${(props) => (props.active ? "flex" : "none")};
  }
`;

export const AddPostInput = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10rem;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.lightest};
  margin-top: 0.5rem;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 0.8; /* Firefox */
  }
`;
export const InputLikeDiv = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10rem;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.lightest};
  margin-top: 0.5rem;
  min-height: 4rem;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 0.8; /* Firefox */
  }
`;
export const AddPostButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border: none;
  border-radius: 10rem;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.lightest};
`;
