import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncType} from "../../common/asyncType";
import {ICreateHabitRequest} from "./habitType";
import {addDoc, collection} from "@firebase/firestore";
import {db} from "../../service/firebase/.firebase";


export const createHabitRequest = createAsyncThunk(
    'habit/createHabitRequest',
    async ({uid, name, goalCount}: ICreateHabitRequest, {rejectWithValue}) => {
        try {
            console.log("habit Create Request");
            const goalHabitRef = collection(db, 'Users', uid, 'GoalHabit');
            await addDoc(goalHabitRef, {
                name, goalCount
            });

            return {
                name, goalCount,
            };


        } catch (e) {
            console.error(e);
            rejectWithValue({});
        }
    }
)

export interface IHabit {
    name: string;
    goalCount: number;
    currentCount: number | undefined;
}

export interface HabitState {
    habitLoading: AsyncType;
    habitError: string | null;
    habits: IHabit[];
}

const initialState: HabitState = {
    habits: [],
    habitError: null,
    habitLoading: 'idle',
};

export const habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createHabitRequest.fulfilled, (state, action) => {
                state.habitError = null;
                state.habitLoading = 'succeeded';
                state.habits = state.habits.concat({
                    name: action?.payload?.name ?? '', goalCount: action?.payload?.goalCount ?? 0, currentCount: 0
                });
            })
            .addCase(createHabitRequest.rejected, (state, action) => {
                state.habitError = action.payload as string;
                state.habitLoading = 'failed';
            })
            .addCase(createHabitRequest.pending, (state, action) => {
                state.habitLoading = 'pending';
                state.habitError = null;
            });
    }
})

