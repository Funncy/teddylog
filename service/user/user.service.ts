import { UpOutlined } from '@ant-design/icons';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';
import { StringLike } from '@firebase/util';
import { IUpdateRequestUser, IUser } from '../../features/user/user.interface';

export class UserService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async getUser(uid: string): Promise<IUser | null> {
    const userCollection = doc(this.db, 'Users', uid);
    const userSnap = await getDoc(userCollection);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return {
        uid: uid,
        email: data.email,
        nickname: data.nickname,
        introduce: data.introduce,
      };
    }

    return null;
  }

  async updateUserInfo({
    uid,
    email,
    nickname,
    introduce,
  }: IUpdateRequestUser): Promise<IUser> {
    const userCollection = doc(this.db, 'Users', uid);
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
  }
}
