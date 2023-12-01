import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/registerform/RegisterForm";
import LoginForm from "./components/loginform/LoginForm";
import NotFoundPage from "./pages/404Page";

import PrivateRoutes from "./components/PrivateRoutes";

import NewPost from "./pages/NewPostPage";
import PostPage from "./pages/PostPage";
import PostIdPage from "./pages/PostIdPage";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/post/:postId" element={<PostIdPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
