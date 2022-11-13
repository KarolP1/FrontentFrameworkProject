import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  border-radius: 10rem;
  border: 3px solid ${(props) => props.theme.color.medium};
  overflow: hidden;
  background-color: ${(props) => props.theme.color.tint};
  align-items: center;
  padding: 0 2rem;

  input {
    background-color: transparent;
    flex: 1;
    display: flex;
    height: 100%;
    border: none;
    padding: 0 1rem;
    outline: none;
    color: ${(props) => props.theme.color.darkTint};

    &:active {
      border: none;
    }
  }
`;

export const DisplayNames = styled.div<{ isVisible: boolean }>`
  position: absolute;
  background-color: ${(props) => props.theme.color.medium};
  width: 100%;
  display: ${(props) => (props.isVisible === false ? "none" : "flex")};
  flex-direction: column;
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 1rem;
`;
