import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/authtrue/homepage";
import { useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/authfalse/LoginPage";
import ProfilePage from "./pages/authtrue/Profile";
import NotFound from "./pages/authtrue/NotFound";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.login);

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
