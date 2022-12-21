import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = { 
//   user: user ? user : null,
  user:  null,
  travelers: [],
  consumers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    console.log(user)
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// export const logout = createAsyncThunk('auth/logout', async () => {
//   await authService.logout()
// })

// export const getTravelers = createAsyncThunk('auth/travelers', async (thunkAPI) => {
//     try {
//       return await authService.getTravelers()
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   })

// export const getConsumers = createAsyncThunk('auth/consumers', async (thunkAPI) => {
//     try {
//       return await authService.getConsumers()
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//         state.user = null
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//         state.user = null
//       })
//       .addCase(getTravelers.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getTravelers.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.travelers = action.payload
//       })
//       .addCase(getTravelers.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//       })
//       .addCase(getConsumers.pending, (state) => {
//         state.isLoading = true
//       })
//       .addCase(getConsumers.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.isSuccess = true
//         state.consumers = action.payload
      
//       })
//       .addCase(getConsumers.rejected, (state, action) => {
//         state.isLoading = false
//         state.isError = true
//         state.message = action.payload
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null
//       })
//   },
  extraReducers: (builder) => {
    builder  
    .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
    
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer