export const RouteSignIn = "/auth/sign-in";
export const RouteSignUp = "/auth/sign-up";

// user routes
export const RouteUserIndexBlogs = "/";
export const RouteUserManageBlogs = "/my-blogs";
export const RouteUserProfile = "/profile";
export const routeUserContact = "/contact";
export const routeUserAbout = "/about";
export const RouteUserBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return "/blog/details/:category/:blog";
  } else {
    return `/blog/details/${category}/${blog}`;
  }
};
export const RouteUserBlogByCategory = (category) => {
  if (category) {
    return `/blog/${category}`;
  } else {
    return "/blog/:category";
  }
};

// admin routes
export const routeAdminManageCategory = "/admin/manage-category";
export const routeAdminManageDashBoard = "/admin/manage-dashboard";
export const routeAdminManageUserBlog = "/admin/manage-user-blogs";
export const routeAdminManageUser = "/admin/manage-user";
export const routeAdminManageMessage = "/admin/manage-message";
