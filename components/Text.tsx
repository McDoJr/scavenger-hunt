import React from 'react';
import { TextProps, Text as Txt } from 'react-native';

type Props = TextProps;

export default function Text({ style, children, ...props }: Props) {
    return (
        <Txt style={[style, { fontFamily: "SpaceMono" }]} {...props}>{children}</Txt>
    )
}