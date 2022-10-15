import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from '../../common/asyncType';
import { fetchUserInfoRequest } from '../user/user.slice';
import { AuthService } from '../../service/auth/auth.service';
import { ISignUpRequest, ILoginRequest } from './auth.interface';

const authService = new AuthService();

export const fetchLoginRequest = createAsyncThunk(
  'auth/fetchLoginRequest',
  async (user: ILoginRequest, { rejectWithValue, dispatch }) => {
    try {
      const auth = await authService.login(user);

      dispatch(
        fetchUserInfoRequest({
          email: auth.email,
          uid: auth.uid,
        })
      );
      return auth;
    } catch (err) {
      throw rejectWithValue('로그인 실패');
    }
  }
);

export const fetchSignUpRequest = createAsyncThunk(
  'auth/fetchSignUpRequest',
  async (request: ISignUpRequest, { rejectWithValue }) => {
    try {
      return await authService.signUp(request);
    } catch (err) {
      throw rejectWithValue('회원가입 실패');
    }
  }
);

export interface AuthState {
  token: string | null;
  uid: string | null;
  email: string | null;

  loginLoading: AsyncType;
  loginError: string | null;

  signUpError: string | null;
  signUpLoading: AsyncType;
}

const initialState: AuthState = {
  token: null,
  uid: null,
  email: null,

  loginLoading: 'idle',
  loginError: null,

  signUpError: null,
  signUpLoading: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginRequest.pending, (state, action) => {
        state.loginError = null;
        state.loginLoading = 'pending';
      })
      .addCase(fetchLoginRequest.fulfilled, (state, action) => {
        console.log('data!');
        console.log(action.payload);
        state.loginError = null;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.loginLoading = 'succeeded';
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        state.loginError = action.payload as string;
        state.loginLoading = 'failed';
        state.email = null;
        state.token = null;
        state.uid = null;
      });

    builder
      .addCase(fetchSignUpRequest.pending, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'pending';
      })
      .addCase(fetchSignUpRequest.fulfilled, (state, action) => {
        state.signUpError = null;
        state.signUpLoading = 'succeeded';

        state.token = action.payload.token;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
      })
      .addCase(fetchSignUpRequest.rejected, (state, action) => {
        state.signUpLoading = 'failed';
        state.signUpError = action.payload as string;

        state.token = null;
        state.email = null;
        state.uid = null;
      });
  },
});
