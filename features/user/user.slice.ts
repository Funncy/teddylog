import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from '../../common/asyncType';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../service/firebase/.firebase';
import { UserService } from '../../service/user/user.service';
import { IUpdateRequestUser, IUserRequest } from './user.interface';

const userService = new UserService(db);

export const fetchUserInfoRequest = createAsyncThunk(
  'user/fetchUserInfoRequest',
  async (userRequest: IUserRequest, { rejectWithValue }) => {
    try {
      const { uid, email } = userRequest;

      const user = await userService.getUser(uid);

      if (user === null) {
        return {
          email,
          nickname: null,
          introduce: null,
        };
      }

      return user;
    } catch (err) {
      throw rejectWithValue('유저 정보 요청 실패');
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (updateUserRequest: IUpdateRequestUser, { rejectWithValue }) => {
    try {
      const { uid, email, nickname, introduce } = updateUserRequest;
      if (uid === null || email == null)
        throw rejectWithValue('유저 정보 오류');

      const updatedUser = await userService.updateUserInfo({
        uid,
        email,
        nickname,
        introduce,
      });

      return updatedUser;
    } catch (err) {
      throw rejectWithValue('유저 정보 요청 실패');
    }
  }
);

export interface UserState {
  email: string | null;
  nickname: string | null;
  introduce: string | null;

  fetchLoading: AsyncType;
  fetchError: string | null;

  updateLoading: AsyncType;
  updateError: string | null;
}

const initialState: UserState = {
  email: null,
  nickname: null,
  introduce: null,

  fetchLoading: 'idle',
  fetchError: null,

  updateLoading: 'idle',
  updateError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoRequest.fulfilled, (state, action) => {
        state.fetchError = null;
        state.fetchLoading = 'succeeded';
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
        state.introduce = action.payload.introduce;
      })
      .addCase(fetchUserInfoRequest.rejected, (state, action) => {
        state.fetchError = action.payload as string;
        state.fetchLoading = 'failed';
      })
      .addCase(fetchUserInfoRequest.pending, (state, action) => {
        state.fetchLoading = 'pending';
        state.fetchError = null;
      });

    builder
      .addCase(updateUserInfo.pending, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'pending';
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.updateError = null;
        state.updateLoading = 'succeeded';
        state.introduce = action.payload.introduce;
        state.nickname = action.payload.nickname;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateLoading = 'failed';
        state.updateError = action.payload as string;
        state.introduce = null;
        state.nickname = null;
      });
  },
});

export default userSlice.reducer;
