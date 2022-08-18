import {AsyncType} from "../../common/asyncType";

export interface IHabit {
    name: string;
    goalCount: number;
    currentCount: number | undefined;
}

export interface HabitState {
    habbitLoading: AsyncType;
    habbitError: string | null;
    habbits: IHabit[];
}

const initialState: HabitState = {
    habbits: [],
    habbitError: null,
    habbitLoading: 'idle',
};
