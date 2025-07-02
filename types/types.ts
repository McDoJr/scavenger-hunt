export type QuestionData = {
    img_src: string;
    "Age Group": string[];
    question: string;
    responseType: string;
    choices: string[];
    hint: string;
    Answer: any[];
    pointsRewarded: number[];
}

export type SubmissionResult = {
    isCorrect: boolean;
    coordinates: { latitude: number, longitude: number };
}