import Spinner from "../../components/ui/loading";
import SignedInContainer from "../../components/ui/LoggedIn/signedInContainer";
import { useGetAllPostsQuery } from "../../redux/api";

const Homepage = () => {
  const { isLoading, data } = useGetAllPostsQuery();
  return (
    <SignedInContainer>
      {isLoading ? <Spinner /> : <div>{JSON.stringify(data)}</div>}
    </SignedInContainer>
  );
};

export default Homepage;
