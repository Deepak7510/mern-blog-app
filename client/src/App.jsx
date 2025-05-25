import { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  routeAdminManageUserBlog,
  routeAdminManageCategory,
  routeAdminManageComment,
  routeAdminManageDashBoard,
  RouteSignIn,
  RouteSignUp,
  RouteUserBlogByCategory,
  RouteUserBlogDetails,
  RouteUserIndexBlogs,
  RouteUserManageBlogs,
  routeAdminManageUser,
  RouteUserProfile,
} from "./helpers/route";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AuthLayout from "./components/auth/AuthLayout";
import UserHomePage from "./pages/user/UserHomePage";
import UserLayout from "./components/user/common/UserLayout";
import UserBlogDetailsPage from "./pages/user/UserBlogDetailsPage";
import UserBlogByCategory from "./pages/user/UserBlogByCategory";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/auth-slice";
import AdminLayout from "./components/admin/common/AdminLayout";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminManageCommentPage from "./pages/admin/AdminManageCommentPage";
import ToProtecteRoute from "./components/common/ToProtecteRoute";
import Loading from "./components/common/Loading";
import AdminUserBlogPage from "./pages/admin/AdminUserBlogPage";
import CommonBlogPage from "./pages/common/CommonBlogPage";
import AdminManageUserPage from "./pages/admin/AdminManageUserPage";
import CommonProfilePage from "./pages/common/CommonProfilePage";

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
          path={"/auth"}
          element={
            <ToProtecteRoute user={user} isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </ToProtecteRoute>
          }
        >
          <Route path={RouteSignUp} element={<SignUp />} />
          <Route path={RouteSignIn} element={<SignIn />} />
        </Route>

        <Route
          path={"/"}
          element={
            <ToProtecteRoute user={user} isAuthenticated={isAuthenticated}>
              <UserLayout />
            </ToProtecteRoute>
          }
        >
          <Route index element={<UserHomePage />} />
          <Route path={RouteUserManageBlogs} element={<CommonBlogPage />} />
          <Route path={RouteUserProfile} element={<CommonProfilePage />} />
          <Route
            path={RouteUserBlogByCategory()}
            element={<UserBlogByCategory />}
          />
          <Route
            path={RouteUserBlogDetails()}
            element={<UserBlogDetailsPage />}
          />
          <Route />
        </Route>

        <Route
          path="/admin"
          element={
            <ToProtecteRoute user={user} isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </ToProtecteRoute>
          }
        >
          <Route index element={<Navigate to={routeAdminManageDashBoard} />} />
          <Route
            path={routeAdminManageDashBoard}
            element={<AdminDashboardPage />}
          />
          <Route
            path={routeAdminManageCategory}
            element={<AdminCategoryPage />}
          />
          <Route
            path={routeAdminManageComment}
            element={<AdminManageCommentPage />}
          />
          <Route
            path={routeAdminManageUserBlog}
            element={<AdminUserBlogPage />}
          />
          <Route
            path={routeAdminManageUser}
            element={<AdminManageUserPage />}
          />
        </Route>
      </Routes>

      {/* <Routes>
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
          <Route path={routeAdminCategory} element={<AdminCategory />} />
          <Route path={RouteAdminBlog} element={<AdminBlog />} />
          <Route path={RouteBlogDetails()} element={<BlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteBlogSearch()} element={<SearchResult />} />
          <Route path={RouteComments} element={<Comments />} />
          <Route path={RouteUsers} element={<Users />} />
        </Route>

        

        <Route path={"*"} element={<PageNotFound />} />
      </Routes> */}
    </>
  );
}

export default App;
