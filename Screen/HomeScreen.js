import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 Chọn Bài Lab 🔥</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Bai2')}
            >
                <Text style={styles.text}>Bài 2: Đăng nhập Firebase</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Bai3')}
            >
                <Text style={styles.text}>Bài 3: Gửi Form API</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
    button: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});
