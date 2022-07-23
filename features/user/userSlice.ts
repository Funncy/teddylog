import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequestParams } from '../../params/loginRequestParams';

const wait = (timeToDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay)); //이와 같이 선언 후

export const fetchLoginRequest = createAsyncThunk(
  'user/fetchLoginRequest',
  async (loginRequestParams: LoginRequestParams) => {
    // const response = await userAPI.fetchById(userId)
    // return response.data

    await wait(1000);

    // throw new Error('error!');
    return {
      email: loginRequestParams.email,
      nickname: 'TEddy!',
    };
  }
);

export interface UserState {
  email: string;
  nickname: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface LoginDataForm {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: '',
  nickname: '',
  loading: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequestParams>) => {
      state.email = action.payload.email;
      state.nickname = 'Teddy';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginRequest.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
        state.loading = 'succeeded';
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        console.log('rejectEd!!');
        state.nickname = 'reject';
        state.loading = 'failed';
      })
      .addCase(fetchLoginRequest.pending, (state, action) => {
        state.loading = 'pending';
      });
  },
});

export const { loginRequest } = userSlice.actions;

export default userSlice.reducer;
