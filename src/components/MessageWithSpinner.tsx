import React from "react";
import { Text, Spinner } from "native-base";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        textAlign: "center",
    },
    title: {
        paddingTop: 40
    }
});

interface Props {
    spinnerColor?: string;
    text: string
}

const MessageWithSpinner: React.SFC<Props> = (props) => {
    const { text, spinnerColor = "blue"} = props;
    return (
        <>
            <View style={styles.title}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <Spinner color={spinnerColor} />
        </>
    )
}

export default MessageWithSpinner;