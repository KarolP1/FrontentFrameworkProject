import styled from "styled-components";

export const ProfileInfoContainer = styled.div`
  width: 100%;
  background-color: #ffffff15;
  border-radius: 1rem;
  flex-direction: row;
  display: flex;
  padding: 1rem;
  position: relative;

  @media (min-width: 768px) {
    width: 50%;
    align-self: flex-end;
  }
`;

export const ProfileImg = styled.img`
  border-radius: 1rem;
  overflow: hidden;
  width: 15rem;
  aspect-ratio: 1;
`;

export const MainContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
`;

export const Info = styled.div`
  padding: 2rem;
  align-self: center;

  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.lightest};
  }
  input {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.tint};
    background-color: ${(props) => props.theme.color.dark};
    border: none;
    margin: 2px 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
  }
`;
