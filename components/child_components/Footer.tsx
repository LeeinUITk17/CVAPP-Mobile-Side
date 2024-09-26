import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
    return (
        <ThemedView style={styles.footerContainer}>
            <View style={styles.iconRow}>
                <Ionicons name="logo-linkedin" size={20} color="black" onPress={() => Linking.openURL('https://www.linkedin.com/in/le-thanh-tai-0aa321254/')} />
                <Ionicons name="logo-github" size={20} color="black" onPress={() => Linking.openURL('https://github.com/LeeinUITk17')} />
            </View>
            <ThemedText style={styles.footerText}>© 2024 Le Thanh Tai</ThemedText>
            <ThemedText style={styles.footerText}>Email: 22521276@gm.uit.edu.vn</ThemedText>
            <ThemedText style={styles.footerText}>
                LinkedIn:{" "}
                <Text
                    style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.linkedin.com/in/le-thanh-tai-0aa321254/')}>
                    Connect with me
                </Text>
            </ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        padding: 20,
        backgroundColor: 'orange',
        alignItems: 'center',
        borderRadius: 10,
    },
    footerText: {
        color: '#E0E0E0',
        fontSize: 14,
        marginBottom: 4,
    },
    linkText: {
        color: 'black',
        textDecorationLine: 'underline',
    },
    iconRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    },
});

export default Footer;
