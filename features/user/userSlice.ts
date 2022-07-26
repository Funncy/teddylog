import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType, IAsync } from '../../common/asyncType';
import { IUpdateUserRequest, IUserRequest } from './userType';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { db } from '../../service/firebase/.firebase';

export const fetchUserInfoRequest = createAsyncThunk(
  'user/fetchUserInfoRequest',
  async (userRequest: IUserRequest, { rejectWithValue }) => {
    try {
      const { uid, email } = userRequest;
      const userCollection = doc(db, 'Users', uid);
      const userSnap = await getDoc(userCollection);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return {
          email,
          nickname: data.nickname,
          introduce: data.introduce,
        };
      } else {
        return {
          email,
          nickname: null,
          introduce: null,
        };
      }
    } catch (err) {
      throw rejectWithValue('유저 정보 요청 실패');
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (updateUserRequest: IUpdateUserRequest, { rejectWithValue }) => {
    try {
      const { uid, email, nickname, introduce } = updateUserRequest;
      if (uid === null || email == null)
        throw rejectWithValue('유저 정보 오류');

      const userCollection = doc(db, 'Users', uid);
      const userSnap = await getDoc(userCollection);
      if (userSnap.exists()) {
        await updateDoc(userSnap.ref, {
          email,
          nickname,
          introduce,
        });
      } else {
        await setDoc(userCollection, {
          email,
          nickname,
          introduce,
        });
      }

      return {
        email,
        uid,
        nickname,
        introduce,
      };
    } catch (err) {
      throw rejectWithValue('유저 정보 요청 실패');
    }
  }
);

export interface UserState extends IAsync {
  email: string | null;
  nickname: string | null;
  introduce: string | null;

  updateLoading: AsyncType;
  updateError: string | null;
}

const initialState: UserState = {
  email: null,
  nickname: null,
  introduce: null,
  loading: 'idle',
  error: null,

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
