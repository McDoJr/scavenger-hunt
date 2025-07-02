import QuestionSection from "@/components/QuestionSection";
import Text from "@/components/Text";
import { QuestionData, SubmissionResult } from "@/types/types";
import axios from "axios";
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function index() {

    const [url, setUrl] = useState<string>();
    const [data, setData] = useState<QuestionData | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<SubmissionResult>();

    useEffect(() => {

        const fetchQuestion = async (url: string) => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setData(response.data);
                console.log(response.data);
                setUrl(url);
            } catch (error: any) {
                console.error("Error fetching from scanned url", error);
            } finally {
                setLoading(false);
            }
        }

        const handleLink = (url: string) => {
            const parsed = Linking.parse(url);
            const targetUrl = parsed.queryParams?.url;
            if (targetUrl && typeof targetUrl === "string") {
                fetchQuestion(targetUrl)
            } else {
                console.log("No question has been found");
            }
        }

        const subscription = Linking.addEventListener("url", (event) => {
            resetDatas();
            handleLink(event.url);
        });

        // Handle cold-start
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleLink(url);
            }
        });

        return () => {
            subscription.remove();
        }
    }, []);

    function resetDatas() {
        setData(undefined);
        setUrl(undefined);
        setResult(undefined);
    }

    async function handleSubmit(answer: string) {
        try {
            if (url) {
                setLoading(true);
                const response = await axios.post(url, { answer });
                if (response.data) {
                    setResult(response.data);
                }
            }
        } catch (error) {
            console.log("Failed to fetch answer");
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Scavenger Hunt</Text>
            </View>
            {loading ? (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size={40} />
                </View>
            ) : (
                data ? <QuestionSection data={data} handleSubmit={handleSubmit} result={result} /> : (
                    <View style={styles.contentContainer}>
                        <Text style={{ fontSize: 16 }}>Failed to load a question</Text>
                    </View>
                )
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    titleContainer: {
        marginTop: 80,
    },
    titleText: {
        fontSize: 32,
    },
    contentContainer: {
        marginVertical: "auto",
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center"
    }
})