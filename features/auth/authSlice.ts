import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAsync } from '../../common/asyncType';
import { ILoginRequest } from './authType';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

export const fetchLoginRequest = createAsyncThunk(
  'auth/fetchLoginRequest',
  async (user: ILoginRequest, { rejectWithValue }) => {
    try {
      console.log('로그인 시도!!');
      const credential = await signInWithEmailAndPassword(
        getAuth(),
        user.email,
        user.password
      );
      console.log(`로그인 성공 `);
      return {
        token: await credential.user.getIdToken(),
        email: credential.user.email,
        uid: credential.user.uid,
      };
    } catch (err) {
      console.log(err);
      throw rejectWithValue('로그인 실패');
    }
  }
);

export interface AuthState extends IAsync {
  token: string | null;
  uid: string | null;
  email: string | null;
}

const initialState: AuthState = {
  loading: 'idle',
  error: null,
  token: null,
  uid: null,
  email: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginRequest.pending, (state, action) => {
        state.error = null;
        state.loading = 'pending';
      })
      .addCase(fetchLoginRequest.fulfilled, (state, action) => {
        console.log('data!');
        console.log(action.payload);
        state.error = null;
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.loading = 'succeeded';
      })
      .addCase(fetchLoginRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = 'failed';
        state.email = null;
        state.token = null;
        state.uid = null;
      });
  },
});
