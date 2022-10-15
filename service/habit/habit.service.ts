import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  DocumentReference,
  updateDoc,
} from '@firebase/firestore';
import { IGoalHabit, IHabit } from '../../interface/habit/habit.interface';
import getTodayDocId from '../../utils/getDocId';

const UserCollectionName = 'Users';
const HabitsLogCollectionName = 'HabitsLog';
const HabitsCollectionName = 'Habits';

export class HabitService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async fetchInitHabits(uid: string) {
    const docId = getTodayDocId();
    const habitLogRef = doc(
      this.db,
      UserCollectionName,
      uid,
      HabitsLogCollectionName,
      docId
    );
    const docSnapshot = await getDoc(habitLogRef);
    if (docSnapshot.exists()) {
      return this.fetchHabits(uid, docId);
    } else {
      const goalHabits = await this.fetchGoalHabits(uid);
      const refs = await this.createInitHabits(goalHabits, uid, docId);

      return refs.map((ref, index) => {
        return {
          ...goalHabits[index],
          id: ref.id,
        };
      });
    }
  }

  private async fetchHabits(uid: string, docId: string): Promise<IHabit[]> {
    const habitsCollection = collection(
      this.db,
      UserCollectionName,
      uid,
      HabitsLogCollectionName,
      docId,
      HabitsCollectionName
    );
    const habits = await getDocs(habitsCollection);

    return habits.docs.map<IHabit>((e) => ({
      id: e.id,
      habitRef: e.data().habitRef,
      name: e.data().name,
      goalCount: e.data().goalCount,
      currentCount: e.data().currentCount,
    }));
  }

  private async fetchGoalHabits(uid: string): Promise<IGoalHabit[]> {
    const goalHabitCollection = collection(
      this.db,
      UserCollectionName,
      uid,
      'GoalHabits'
    );
    const goalHabits = await getDocs(goalHabitCollection);

    return goalHabits.docs.map<IGoalHabit>((e) => ({
      name: e.data().name,
      goalCount: e.data().goalCount,
      habitRef: e.ref.path,
    }));
  }

  private async createInitHabits(
    goalHabits: IGoalHabit[],
    uid: string,
    docId: string
  ): Promise<DocumentReference[]> {
    const todayHabitLogCollection = collection(
      this.db,
      UserCollectionName,
      uid,
      HabitsLogCollectionName,
      docId,
      HabitsCollectionName
    );

    return await Promise.all(
      goalHabits.map((goalHabit) =>
        addDoc(todayHabitLogCollection, {
          currentCount: 0,
          ...goalHabit,
        })
      )
    );
  }
}
