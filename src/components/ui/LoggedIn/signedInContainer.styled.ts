import styled from "styled-components";

export const LoggedInContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  background-color: ${(state) => state.theme.color.dark};
`;

export const ScrollContainer = styled.div`
  overflow: scroll;
  height: 100%;
`;
