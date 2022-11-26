import styled from "styled-components";

export const ProfileImage = styled.img`
  display: flex;
  width: 2rem;
  height: 2rem;
  border-radius: 4rem;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);
`;

export const ComentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  width: 100%;
  padding-right: 2rem;
`;

export const ComentContent = styled.div`
  padding: 0 1rem;
  flex: 1;
  p:first-child {
    font-size: 1.5rem;
    color: ${(props) => props.theme.color.darkest};
  }
  p:nth-child(2) {
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.lightest};
    text-transform: capitalize;
  }
  p:nth-child(3) {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.dark};
  }
`;
