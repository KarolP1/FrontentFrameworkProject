import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/authtrue/homepage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/authfalse/LoginPage";
import ProfilePage from "./pages/authtrue/Profile";
import NotFound from "./pages/authtrue/NotFound";
import { useEffect } from "react";
import { login, logout, setLoggedInUser } from "./redux/slices/login.slice";
import SingleImage from "./pages/authtrue/singleImage";
import { setUser, setUsers } from "./redux/slices/Users/Users.slice";
import { useGetUsersQuery } from "./redux/api";
import AddNewPost from "./pages/authtrue/AddNewPost";
import SingleAlbum from "./pages/authtrue/singleAlbum";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const loginState = sessionStorage.getItem("loggedInId");
  const users = useGetUsersQuery();
  useEffect(() => {
    if (users.data) {
      dispatch(setUsers(users.data));
    }
  }, [users, dispatch]);

  const listOfUsers = useAppSelector((state) => state.Users.users);
  const loggedInUser = listOfUsers?.filter((user) => {
    if (loginState) return user.id === parseInt(loginState);
    else return false;
  })[0];

  useEffect(() => {
    if (loginState && loginState?.length !== 0) {
      if (loggedInUser) {
        dispatch(setLoggedInUser(loggedInUser.id));
        dispatch(setUser(loggedInUser));
        dispatch(login());
      }
    } else {
      dispatch(logout());
    }
  }, [loginState, dispatch, loggedInUser]);

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile/:userName" element={<ProfilePage />} />
          <Route path="/image/view/:imageId" element={<SingleImage />} />
          <Route path="/albums/view/:albumId" element={<SingleAlbum />} />
          {/* <Route path="/image/edit/:imageId" element={<ProfilePage />} /> */}
          <Route path="/image/post/" element={<AddNewPost />} />
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
