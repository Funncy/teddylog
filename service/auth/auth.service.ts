import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import {
  ISignUpRequest,
  ILoginSuccess,
} from '../../interface/auth/auth.interface';

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
}
