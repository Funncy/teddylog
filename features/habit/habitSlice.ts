import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from '../../common/asyncType';
import {
  ICreateHabitRequest,
  IFetchHabitsRequest,
  IUpdateHabitRequest,
} from './habitType';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../../service/firebase/.firebase';
import getTodayDocId, { getDocId } from '../../utils/getDocId';
import { HabitService } from '../../service/habit/habit.service';
import { IHabit } from '../../interface/habit/habit.interface';

const habitService = new HabitService(db);

export const fetchHabitsRequest = createAsyncThunk(
  'habit/fetchHabitsRequest',
  async ({ uid }: IFetchHabitsRequest, { rejectWithValue }) => {
    try {
      return await habitService.fetchInitHabits(uid);
    } catch (e) {
      console.error(e);
      rejectWithValue('습관 불러오기 실패');
    }
  }
);

export const createHabitRequest = createAsyncThunk(
  'habit/createHabitRequest',
  async (
    { uid, name, goalCount }: ICreateHabitRequest,
    { rejectWithValue }
  ) => {
    try {
      return await habitService.createNewHabit({ uid, name, goalCount });
    } catch (e) {
      console.error(e);
      rejectWithValue('습관 생성 실패');
    }
  }
);

export const updateHabitRequest = createAsyncThunk(
  'habit/updateHabitRequest',
  async ({ uid, hid, count }: IUpdateHabitRequest, { rejectWithValue }) => {
    try {
      const todayDocId = getTodayDocId();
      const habitRef = doc(
        db,
        'Users',
        uid,
        'HabitsLog',
        todayDocId,
        'Habits',
        hid
      );

      await updateDoc(habitRef, {
        currentCount: count,
      });

      return {
        id: hid,
        count,
      };
    } catch (e) {
      console.error(e);
      rejectWithValue({});
    }
  }
);

export interface HabitState {
  habitFetchLoading: AsyncType;
  habitFetchError: string | null;
  habitCreateLoading: AsyncType;
  habitCreateError: string | null;
  habitUpdateLoading: string | null;
  habitUpdateError: string | null;
  habits: IHabit[];
}

const initialState: HabitState = {
  habits: [],
  habitFetchError: null,
  habitFetchLoading: 'idle',
  habitCreateError: null,
  habitCreateLoading: 'idle',
  habitUpdateError: null,
  habitUpdateLoading: 'idle',
};

export const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHabitRequest.fulfilled, (state, action) => {
        state.habitCreateError = null;
        state.habitCreateLoading = 'succeeded';
        if (action.payload !== undefined) state.habits.push(action.payload);
      })
      .addCase(createHabitRequest.rejected, (state, action) => {
        state.habitCreateError = action.payload as string;
        state.habitCreateLoading = 'failed';
      })
      .addCase(createHabitRequest.pending, (state, action) => {
        state.habitCreateLoading = 'pending';
        state.habitCreateError = null;
      });

    builder
      .addCase(fetchHabitsRequest.fulfilled, (state, action) => {
        state.habitFetchError = null;
        state.habitFetchLoading = 'succeeded';
        console.dir(action.payload as IHabit[]);
        state.habits = action.payload as IHabit[];
      })
      .addCase(fetchHabitsRequest.rejected, (state, action) => {
        state.habitFetchError = action.payload as string;
        state.habitFetchLoading = 'failed';
      })
      .addCase(fetchHabitsRequest.pending, (state, action) => {
        state.habitFetchLoading = 'pending';
        state.habitFetchError = null;
      });

    builder
      .addCase(updateHabitRequest.fulfilled, (state, action) => {
        state.habitUpdateError = null;
        state.habitUpdateLoading = 'succeeded';
        const index = state.habits.findIndex(
          (e) => e.id === action.payload!.id
        );
        state.habits[index].currentCount = action.payload!.count;
      })
      .addCase(updateHabitRequest.rejected, (state, action) => {
        state.habitUpdateError = action.payload as string;
        state.habitUpdateLoading = 'failed';
      })
      .addCase(updateHabitRequest.pending, (state, action) => {
        state.habitUpdateLoading = 'pending';
        state.habitUpdateError = null;
      });
  },
});
