// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyASFscliDE7ExPct6gMZ_U2AQwJKlajmSs',
  authDomain: 'teddy-log.firebaseapp.com',
  projectId: 'teddy-log',
  storageBucket: 'teddy-log.appspot.com',
  messagingSenderId: '463332701235',
  appId: '1:463332701235:web:c7b4abf06857197cdb5f46',
  measurementId: 'G-CSSMGWVFVE',
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

export async function init() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
