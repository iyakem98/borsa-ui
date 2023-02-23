import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { json } from 'react-router-dom'
import chatService from './chatService'

const getUser = async() => {
  const user1 = await  AsyncStorage.getItem('user')
  const user = JSON.parse(user1)

  return user
}

const chatData = 'let us see eski'

const initialState = {
    chatData: "fdlkjlkj",
    selllectedChat: {},
    chattts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }


  export const accessChat = createAsyncThunk(
    'chat/access',
    async (userId, thunkAPI) => {
      console.log(userId)
      try {
        const token = thunkAPI.getState().auth.user.token
        return await chatService.accessChat(userId, token)
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
  
  export const singleChat = createAsyncThunk(
    'chat/single',
    async (chatId, thunkAPI) => {
      try {
        // const token = thunkAPI.getState().auth.user.token
  
        console.log('fetching in chatSlice')
        return await chatService.singleChat(chatId)
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
  export const fetchChat = createAsyncThunk(
    'chat/get',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
  
        console.log('fetching in chatSlice')
        return await chatService.fetchChat(token)
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

  export const tryChat = createAsyncThunk(
    'chat/try',
    async (mydat, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log("boooo")
        console.log(mydat)
        return await chatService.tryChat(mydat, token)
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
  // export const deleteChat = createAsyncThunk(
  //   'chat/remove',
  //   async (chatID, thunkAPI) => {
  //     try {
  //       const token = thunkAPI.getState().auth.user.token
       
  //       // console.log(mydat)
  //       return await chatService.deleteChat(chatID, token)
  //     } catch (error) {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString()
  //       return thunkAPI.rejectWithValue(message)
  //     }
  //   }
  // )
  export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(accessChat.pending, (state) => {
          state.isLoading = true
        })
        .addCase(accessChat.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chattts.push(action.payload)
          state.selllectedChat.pop()
          state.selllectedChat.push(action.payload)
        })
        .addCase(accessChat.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          
        })
        .addCase(fetchChat.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchChat.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chattts = action.payload
        })
        .addCase(fetchChat.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(singleChat.pending, (state) => {
          state.isLoading = true
        })
        .addCase(singleChat.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chattts = action.payload
        })
        .addCase(singleChat.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(tryChat.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.chattts.push(action.payload)
        })
        // .addCase(deleteChat.fulfilled, (state, action) => {
        //   state.isLoading = false
        //   state.isSuccess = true
         
        // })
    },
  })
  
  export const { reset } = chatSlice.actions
  export default chatSlice.reducer
  