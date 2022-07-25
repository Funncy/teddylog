import { Firestore } from '@firebase/firestore';

export class UserService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }
}
