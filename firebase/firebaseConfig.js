import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase (từ Firebase Console của Púc)
const firebaseConfig = {
    apiKey: "AIzaSyCvRdQkdhDqjeLifC10hLt4KYdQ-tzgzII",
    authDomain: "lab7-cro102-81e7b.firebaseapp.com",
    projectId: "lab7-cro102-81e7b",
    storageBucket: "lab7-cro102-81e7b.appspot.com",
    messagingSenderId: "66879073637",
    appId: "1:66879073637:web:5d6e5713685897c73d858c",
    measurementId: "G-2M1RPRQ24L"
};

// Khởi tạo Firebase app (kiểm tra nếu chưa có thì mới khởi tạo)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Khởi tạo Firebase Auth với AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
