import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export function home() {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}