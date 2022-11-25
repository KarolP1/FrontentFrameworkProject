import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/authtrue/homepage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/authfalse/LoginPage";
import ProfilePage from "./pages/authtrue/Profile";
import NotFound from "./pages/authtrue/NotFound";
import { useEffect } from "react";
import { login, setLoggedInUser } from "./redux/slices/login.slice";
import SingleImage from "./pages/authtrue/singleImage";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const loginState = sessionStorage.getItem("loggedInId");

  useEffect(() => {
    console.log(loginState);
    if (loginState) {
      dispatch(login());
      dispatch(setLoggedInUser(parseInt(loginState)));
    }
  }, [loginState, dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile/:userName" element={<ProfilePage />} />
          <Route path="/image/view/:imageId" element={<SingleImage />} />
          <Route path="/image/edit/:imageId" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
