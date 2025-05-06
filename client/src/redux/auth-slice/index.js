import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, formData }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw result;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

// export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,
//       {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//         },
//         credentials: "include",
//       }
//     );
//     if (!response.ok) {
//       const result = await response.json();
//       throw result;
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     return error;
//   }
// });

export const checkAuth = createAsyncThunk("auth/checkAuth", async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      const result = await response.json();
      throw result;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      const result = await response.json();
      throw result;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTokenAndCredantial: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.success ? action.payload.token : null;
        if (action.payload.success)
          sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        sessionStorage.removeItem("token");
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.success ? action.payload.token : null;
        if (action.payload.success)
          sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(googleLogin.rejected, (state) => {
        state.isLoading = false;
        state.token = null;
        sessionStorage.removeItem("token");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetTokenAndCredantial } = authSlice.actions;
export default authSlice.reducer;
