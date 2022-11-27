import styled from "styled-components";
export const AppbarContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  background-color: ${(props) => props.theme.color.darkTint};
  margin-bottom: 1rem;
  box-shadow: ${(props) => `2px 2px 12px ${props.theme.color.darkTint}`};
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;
