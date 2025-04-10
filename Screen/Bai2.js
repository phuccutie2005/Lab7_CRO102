import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Đường dẫn đúng tới file firebase.js của Púc

export default function Bai1_2() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert('Đăng ký thành công!'))
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => alert('Đăng nhập thành công!'))
            .catch((error) => alert(error.message));
    };

    const handleLogout = () => {
        signOut(auth);
    };

    if (initializing) return null;

    return (
        <View style={styles.container}>
            {!user ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button title="Đăng ký" onPress={handleSignUp} />
                    <View style={{ height: 10 }} />
                    <Button title="Đăng nhập" onPress={handleLogin} />
                </>
            ) : (
                <>
                    <Text style={styles.text}>Xin chào: {user.email}</Text>
                    <Button title="Đăng xuất" onPress={handleLogout} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        gap: 15,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});
