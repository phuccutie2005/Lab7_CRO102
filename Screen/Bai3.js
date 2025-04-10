// Bai3Google.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // import từ file chung
import * as AuthSession from 'expo-auth-session';


export default function Bai3Google() {
    const [user, setUser] = useState(null);

    const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '66879073637-9ej56i6p0fs083kpt64qi4jfidckn65a.apps.googleusercontent.com',
        redirectUri: 'https://auth.expo.io/@phuckaido2k5/Lab7',
        scopes: ['profile', 'email'],
    }, discovery);
    console.log(AuthSession.makeRedirectUri({ useProxy: true }));

    // Khi user chọn tài khoản Google   
    useEffect(() => {
        console.log("Google Response >>>", response);

        if (response?.type === 'success') {
            const { id_token } = response.authentication;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        } else if (response?.type === 'dismiss') {
            alert('Bạn đã huỷ đăng nhập Google.');
        }
    }, [response]);


    // Lắng nghe khi user login/logout
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                    <Text style={styles.text}>👤 {user.displayName}</Text>
                    <Text style={styles.text}>📧 {user.email}</Text>
                    <Text style={styles.text}>📱 {user.phoneNumber || 'Chưa có số điện thoại'}</Text>
                    <Button title="Đăng xuất" onPress={handleLogout} />
                </>
            ) : (
                <Button title="Đăng nhập với Google" onPress={() => promptAsync()} disabled={!request} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
    },
});
