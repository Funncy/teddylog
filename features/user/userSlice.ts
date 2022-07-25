import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAsync } from '../../common/asyncType';
import { IUserRequest } from './userType';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../service/firebase/.firebase';

export const fetchUserInfoRequest = createAsyncThunk(
  'user/fetchUserInfoRequest',
  async (userRequest: IUserRequest, { rejectWithValue }) => {
    try {
      const userCollection = doc(db, 'Users', userRequest.uid);
      const userSnap = await getDoc(userCollection);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return {
          email: userRequest.email,
          nickname: data.nickname,
          introduce: data.introduce,
        };
      } else {
        return {
          email: userRequest.email,
          nickname: null,
          introduce: null,
        };
      }
    } catch (err) {
      throw rejectWithValue('유저 정보 요청 실패');
    }
  }
);

export interface UserState extends IAsync {
  email: string | null;
  nickname: string | null;
  introduce: string | null;
}

const initialState: UserState = {
  email: null,
  nickname: null,
  introduce: null,
  loading: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoRequest.fulfilled, (state, action) => {
        state.error = null;
        state.loading = 'succeeded';
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
        state.introduce = action.payload.introduce;
      })
      .addCase(fetchUserInfoRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = 'failed';
      })
      .addCase(fetchUserInfoRequest.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
      });
  },
});

export default userSlice.reducer;
