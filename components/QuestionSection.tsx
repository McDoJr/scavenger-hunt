import { QuestionData, SubmissionResult } from '@/types/types';
import * as Linking from 'expo-linking';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Question from './Question';
import Text from './Text';

type Props = {
    data: QuestionData;
    handleSubmit: (answer: string) => void;
    result?: SubmissionResult;
}

export default function QuestionSection({ data, handleSubmit, result }: Props) {

    const openInGoogleMaps = (latitude: number, longitude: number) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return !result ? <Question data={data} handleSubmit={handleSubmit} /> : (
        <View style={{
            display: "flex",
            marginVertical: "auto",
            gap: 20,
            alignItems: "center"
        }}>
            {result.isCorrect && (
                <Text style={{
                    fontSize: 20
                }}>You are correct!</Text>
            )}
            <TouchableOpacity
                activeOpacity={.8}
                style={{
                    padding: 10,
                    backgroundColor: "#000000",
                    borderRadius: 3
                }}
                onPress={() => openInGoogleMaps(result.coordinates.latitude, result.coordinates.longitude)}
            >
                <Text style={{ color: "#ffffff", fontSize: 16 }}>New Coordinates</Text>
            </TouchableOpacity>
        </View>
    )
}