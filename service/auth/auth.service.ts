import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import {
  ISignUpRequest,
  ILoginSuccess,
  ILoginRequest,
} from '../../features/auth/auth.interface';

export class AuthService {
  async signUp({ email, password }: ISignUpRequest): Promise<ILoginSuccess> {
    const credential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    return {
      token: await credential.user.getIdToken(),
      email: credential.user.email,
      uid: credential.user.uid,
    };
  }

  async login({ email, password }: ILoginRequest): Promise<ILoginSuccess> {
    const credential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    return {
      token: await credential.user.getIdToken(),
      email: credential.user.email,
      uid: credential.user.uid,
    };
  }
}
