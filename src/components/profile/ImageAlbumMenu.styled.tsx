import styled from "styled-components";

export const MenuContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 50%;
`;

export const MenuElement = styled.div<{ selected: boolean }>`
  width: 50%;
  background-color: #fff;
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  text-align: center;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.tint};
  transition: scale 5000ms ease-in-out infinite;
  font-weight: 700;

  :hover {
    transform: scale(${(props) => (props.selected ? "1" : "1.05")});
  }

  -webkit-box-shadow: ${(props) => (props.selected ? "inset" : "")} 0px 0px 14px
    0px rgba(66, 68, 90, 1);
  -moz-box-shadow: ${(props) => (props.selected ? "inset" : "")} 0px 0px 14px
    0px rgba(66, 68, 90, 1);
  box-shadow: ${(props) => (props.selected ? "inset" : "")} 0px 0px 14px 0px
    rgba(66, 68, 90, 1);
`;
