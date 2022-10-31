import styled from "styled-components";
const Spinner = () => {
  return <Loading className="loader"></Loading>;
};

const Loading = styled.div`
  border: 10px solid transparent;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Spinner;
