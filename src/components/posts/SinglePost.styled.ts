import styled from "styled-components";

export const SinglePostContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 1rem 10%;
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
  }
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
  height: 50px;

  mask: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 95%
  );
`;
