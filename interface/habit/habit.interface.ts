export interface IHabit {
  id: string;
  name: string;
  goalCount: number;
  currentCount: number | undefined;
  habitRef: string;
}

export interface IGoalHabit {
  name: string;
  goalCount: number;
  habitRef: string;
}

export interface ICreateHabitRequest {
  uid: string;
  name: string;
  goalCount: number;
}

export interface 
