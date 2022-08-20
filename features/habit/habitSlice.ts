import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncType } from '../../common/asyncType';
import { ICreateHabitRequest, IFetchHabitsRequest } from './habitType';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@firebase/firestore';
import { db } from '../../service/firebase/.firebase';

export const fetchHabitsRequest = createAsyncThunk(
  'habit/fetchHabitsRequest',
  async ({ uid }: IFetchHabitsRequest, { rejectWithValue }) => {
    try {
      const now = new Date();
      const date = `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}`;
      console.log(date);

      const habitLogRef = doc(db, 'Users', uid, 'HabitsLog', date);
      const docSnapshot = await getDoc(habitLogRef);
      if (docSnapshot.exists()) {
        console.log('doc 존재!');
        const habitsCollection = collection(
          db,
          'Users',
          uid,
          'HabitsLog',
          date,
          'Habits'
        );
        const habits = await getDocs(habitsCollection);

        console.log(`해당 Doc 갯수 ${habits.docs.length}`);

        return habits.docs.map<IHabit>((e) => ({
          id: e.id,
          habitRef: e.data().habitRef,
          name: e.data().name,
          goalCount: e.data().goalCount,
          currentCount: e.data().currentCount,
        }));
      } else {
        console.log('no Docs');
        await setDoc(habitLogRef, {
          date,
          success: false,
        });

        const todayHabitLogCollection = collection(
          db,
          'Users',
          uid,
          'HabitsLog',
          date,
          'Habits'
        );

        const goalHabitCollection = collection(db, 'Users', uid, 'GoalHabits');
        const goalHabits = await getDocs(goalHabitCollection);

        const result: IHabit[] = [];
        for (const goalhabit of goalHabits.docs) {
          const { name, goalCount } = goalhabit.data();
          console.log(`Create Habit ${name} ${goalCount}`);
          const ref = await addDoc(todayHabitLogCollection, {
            name,
            goalCount,
            currentCount: 0,
            habitRef: goalhabit.ref.path,
          });
          result.push({
            id: ref.id,
            name,
            goalCount,
            currentCount: 0,
            habitRef: goalhabit.ref.path,
          });
        }
        return result;
      }
    } catch (e) {
      console.error(e);
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
      console.log('habit Create Request');
      const goalHabitRef = collection(db, 'Users', uid, 'GoalHabits');
      const goalRef = await addDoc(goalHabitRef, {
        name,
        goalCount,
      });

      const now = new Date();
      const date = `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}`;
      const habitsCollection = collection(
        db,
        'Users',
        uid,
        'HabitsLog',
        date,
        'Habits'
      );

      const docRef = await addDoc(habitsCollection, {
        name,
        goalCount,
        currentCount: 0,
        habitRef: goalRef.path,
      });

      return {
        id: docRef.id,
        name,
        goalCount,
        currentCount: 0,
        habitRef: goalRef.path,
      };
    } catch (e) {
      console.error(e);
      rejectWithValue({});
    }
  }
);

export interface IHabit {
  id: string;
  name: string;
  goalCount: number;
  currentCount: number | undefined;
  habitRef: string;
}

export interface HabitState {
  habitFetchLoading: AsyncType;
  habitFetchError: string | null;
  habitCreateLoading: AsyncType;
  habitCreateError: string | null;
  habits: IHabit[];
}

const initialState: HabitState = {
  habits: [],
  habitFetchError: null,
  habitFetchLoading: 'idle',
  habitCreateError: null,
  habitCreateLoading: 'idle',
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
        state.habits = action.payload ?? [];
      })
      .addCase(fetchHabitsRequest.rejected, (state, action) => {
        state.habitFetchError = action.payload as string;
        state.habitFetchLoading = 'failed';
      })
      .addCase(fetchHabitsRequest.pending, (state, action) => {
        state.habitFetchLoading = 'pending';
        state.habitFetchError = null;
      });
  },
});
