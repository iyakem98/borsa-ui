import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

// Get user from localStorage/AsyncStorage
// const user = JSON.parse(localStorage.getItem('user'))
const getUser = async () => {
  // const user = await  AsyncStorage.getItem('user')
  const user = await AsyncStorage.getItem("@user_data");
  // console.log(user)
  // const user = JSON.parse(user1)

  return user;
};

const initialState = {
  // user: getUser ? getUser : null,
  isAuth: false,
  user: null,
  travelers: [],
  consumers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  details: null,
  message: "",
  userDetails: {},
  onlineStatus: false,
};
// const getUser = async() => {
//   const user = await  AsyncStorage.getItem('user')
//   // const user = JSON.parse(user1)

//   return user
// }
// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  try {
    console.log(user);
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserDetails = createAsyncThunk(
  `users/userId`,
  async (userId, thunkAPI) => {
    try {
      // console.log(userId + 'getuserslice')
      return await authService.getUserDetails(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateLastSeenAndStatus = createAsyncThunk(
  "auth/UpdateLastSeenAndStatus",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      // console.log(userId + 'getuserslice')
      return await authService.UpdateLastSeenAndStatus(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const getTravelers = createAsyncThunk("travels", async (thunkAPI) => {
  try {
    return await authService.getTravelers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getConsumers = createAsyncThunk("buyers", async (thunkAPI) => {
  try {
    return await authService.getConsumers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.onlineStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.onlineStatus = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.onlineStatus = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.onlineStatus = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.onlineStatus = false;
      })
      .addCase(getTravelers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTravelers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.travelers = action.payload;
      })
      .addCase(getTravelers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getConsumers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConsumers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.consumers = action.payload;
      })
      .addCase(getConsumers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UpdateLastSeenAndStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateLastSeenAndStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(UpdateLastSeenAndStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.onlineStatus = false;
      });
  },
  // extraReducers: (builder) => {
  //   builder
  //   .addCase(register.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(register.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.user = action.payload
  //     })
  //     .addCase(register.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //       state.user = null
  //     })
  //     .addCase(login.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.user = action.payload
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //       state.user = null
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //               state.user = null
  //     })

  // },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
