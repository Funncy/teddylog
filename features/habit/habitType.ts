export interface ICreateHabitRequest {
    uid: string;
    name: string;
    goalCount: number;
}

export interface IFetchHabitsRequest {
    uid: string;
}

export interface IHabitModal {
    name: string;
    goalCount: number;
}