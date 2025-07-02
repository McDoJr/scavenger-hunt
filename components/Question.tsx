import { QuestionData } from '@/types/types';
import React from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';


type Props = ViewProps & {
    data: QuestionData;
    handleSubmit: (answer: string) => void;
}

export default function Question({ data, handleSubmit, style, ...props }: Props) {

    return (
        <View style={[style, {
            width: "100%",
            paddingHorizontal: 30,
            marginVertical: "auto",
            gap: 40
        }]}>
            <Text style={{
                fontSize: 24,
                textAlign: "center"
            }}>{data.question}</Text>
            <View style={{
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                {data.choices.map(choice => {
                    return (
                        <TouchableOpacity
                            key={choice}
                            activeOpacity={.8}
                            style={{
                                width: "100%",
                                padding: 10,
                                backgroundColor: "#242323",
                                borderRadius: 3
                            }}
                            onPress={() => handleSubmit(choice)}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#ffffff"
                                }}
                            >{choice}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}