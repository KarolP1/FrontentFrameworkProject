import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import Homepage from "./pages/authtrue/homepage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useGetUsersQuery } from "./redux/api";
import { useEffect } from "react";
import { logout } from "./redux/slices/login.slice";
import LoginPage from "./pages/authfalse/LoginPage";
import ProfilePage from "./pages/authtrue/Profile";
import NotFound from "./pages/authtrue/NotFound";

function App() {
  const dispatch = useAppDispatch();
  const { isSuccess } = useGetUsersQuery();
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const navigation = useNavigate();
  useEffect(() => {
    if (!isSuccess) {
      dispatch(logout());
      navigation("/");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
