// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBtvz7kSbkKeFl1FZ_rbfCD6Ntp2RaaZxbI',
  authDomain: 'minitrack-fb471.firebaseapp.com',
  projectId: 'minitrack-fb471',
  storageBucket: 'minitrack-fb471.appspot.com',
  messagingSenderId: '65033654123',
  appId: '1:65033654123:android:13fc5c26f3b83419b6062e',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
