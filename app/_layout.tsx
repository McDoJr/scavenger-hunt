import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <React.Fragment>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style='dark' />
        </React.Fragment>
    )
}