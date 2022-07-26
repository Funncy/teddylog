import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType, IAsync } from '../../common/asyncType';
import { ILoginRequest, ISignUpRequest } from './authType';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';

export const fetchLoginRequest = createAsyncThunk(
  'auth/fetchLoginRequest',
  async (user: ILoginRequest, { rejectWithValue }) => {
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(),
        user.email,
        user.password
      );
      return {
        token: await credential.user.getIdToken(),
        email: credential.user.email,
        uid: credential.user.uid,
      };
    } catch (err) {
      throw rejectWithValue('로그인 실패');
    }
  }
);

export const fetchSignUpRequest = createAsyncThunk(
    'auth/fetchSignUpRequest',
    async (request: ISignUpRequest, {rejectWithValue}) => {
      try {
        const credential = await createUserWithEmailAndPassword(
            getAuth(),
            request.email,
            request.password
        );
        return {
          token: await credential.user.getIdToken(),
          email: credential.user.email,
          uid: credential.user.uid,
        };
      } catch (err) {
        throw rejectWithValue('회원가입 실패');
      }
    }
);

export interface AuthState extends IAsync {
  token: string | null;
  uid: string | null;
  email: string | null;

  signUpError: string | null;
  signUpLoading: AsyncType;
}

const initialState: AuthState = {
  loading: 'idle',
  error: null,
  token: null,
  uid: null,
  email: null,

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

    builder.addCase(fetchSignUpRequest.pending, (state, action) => {
      state.signUpError = null;
      state.signUpLoading = 'pending';
    }).addCase(fetchSignUpRequest.fulfilled, (state, action) => {
      state.signUpError = null;
      state.signUpLoading = 'succeeded';

      state.token = action.payload.token;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    }).addCase(fetchSignUpRequest.rejected, (state, action) => {
      state.signUpLoading = 'failed';
      state.signUpError = action.payload as string;

      state.token = null;
      state.email = null;
      state.uid = null;
    })
  },
});
