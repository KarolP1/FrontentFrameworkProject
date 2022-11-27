import styled from "styled-components";

export const PostContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 5rem 10rem;
  background-color: ${(props) => props.theme.color.tint};
  border-radius: 1rem;
  overflow: hidden;
  -webkit-box-shadow: 14px 12px 26px 6px rgba(0, 0, 0, 0.48);
  box-shadow: 14px 12px 26px 6px rgba(0, 0, 0, 0.48);
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
    overflow: scroll;
    margin: 1rem;
  }
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.color.dark};
  text-transform: capitalize;
  margin: 1rem 0;
`;
export const Description = styled.h3`
  color: ${(props) => props.theme.color.dark};
  margin: 1rem 0;
  :first-letter {
    text-transform: uppercase;
  }
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.medium};

  @media (min-width: 550px) {
    padding: 2rem 1rem;
  }
  @media (min-width: 768px) {
    padding: 2rem 1rem;
  }
  @media (min-width: 900px) {
    padding: 2rem 5rem;
  }
  @media (min-width: 1240px) {
    padding: 2rem 10rem;
  }
`;
