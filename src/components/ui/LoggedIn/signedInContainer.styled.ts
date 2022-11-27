import styled from "styled-components";

export const LoggedInContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(state) => state.theme.color.dark};
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
`;

export const ScrollContainer = styled.div`
  justify-content: flex-start;
  overflow: scroll;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
