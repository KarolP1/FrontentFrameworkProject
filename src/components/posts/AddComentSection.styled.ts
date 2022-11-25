import styled from "styled-components";

export const ComentPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 4rem;
  border-radius: 20rem;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.45);
  -webkit-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.45);

  input {
    display: flex;
    flex: 1;
    height: 100%;
    border: none;
    padding: 0 2rem;
    background-color: ${(props) => props.theme.color.tint};
  }
  button {
    height: 100%;
    aspect-ratio: 1.5;
    background-color: ${(props) => props.theme.color.darkest};
    border: none;
    padding: 5px;
  }
`;
