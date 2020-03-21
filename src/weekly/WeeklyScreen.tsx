import React from "react";
import { View, Text, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export function weekly() {
  return (
    <View style={styles.container}>
      <Text>Weekly forecast</Text>
    </View>
  );
}

