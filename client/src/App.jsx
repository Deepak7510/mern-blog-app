import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  RouteAdminBlog,
  RouteAdminCategory,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogSearch,
  RouteComments,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
  RouteUsers,
} from "./helpers/route";
import { checkAuth } from "./redux/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/common/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminCategory from "./pages/AdminCategory";
import Loading from "./components/common/Loading";
import AdminBlog from "./pages/AdminBlog";
import BlogDetails from "./pages/BlogDetails";
import BlogByCategory from "./pages/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import AuthLayout from "./components/common/AuthLayout";
import ToProtecteRoute from "./components/common/ToProtecteRoute";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { isLoading, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <Route
          path={RouteIndex}
          element={
            <ToProtecteRoute user={user} isAuthenticated={isAuthenticated}>
              <Layout />
            </ToProtecteRoute>
          }
        >
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAdminCategory} element={<AdminCategory />} />
          <Route path={RouteAdminBlog} element={<AdminBlog />} />
          <Route path={RouteBlogDetails()} element={<BlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteBlogSearch()} element={<SearchResult />} />
          <Route path={RouteComments} element={<Comments />} />
          <Route path={RouteUsers} element={<Users />} />
        </Route>

        <Route
          path={"/"}
          element={
            <ToProtecteRoute user={user} isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </ToProtecteRoute>
          }
        >
          <Route path={RouteSignUp} element={<SignUp />} />
          <Route path={RouteSignIn} element={<SignIn />} />
        </Route>

        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
