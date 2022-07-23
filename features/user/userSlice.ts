import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequestParams } from '../../params/loginRequestParams';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

const wait = (timeToDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay)); //이와 같이 선언 후

export const fetchLoginRequest = createAsyncThunk(
  'user/fetchLoginRequest',
  async (loginRequestParams: LoginRequestParams, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      //
      const credential = await signInWithEmailAndPassword(
        auth,
        loginRequestParams.email,
        loginRequestParams.password
      );
      return {
        email: credential.user?.email ?? '',
        nickname: credential.user?.displayName ?? '',
      };
    } catch (err) {
      throw rejectWithValue('로그인 실패');
    }
  }
);

export interface UserState {
  email: string;
  nickname: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginDataForm {
  email: string;
  password: string;
}

const initialState: UserState = {
  email: '',
  nickname: '',
  loading: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequestParams>) => {
      state.email = action.payload.email;
      state.nickname = 'Teddy';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginRequest.fulfilled, (state, action) => {
        state.error = null;
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
        state.loading = 'succeeded';
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = 'failed';
      })
      .addCase(fetchLoginRequest.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
      });
  },
});

export const { loginRequest } = userSlice.actions;

export default userSlice.reducer;
