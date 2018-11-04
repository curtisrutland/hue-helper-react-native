import React from "react";
import { connect } from "react-redux";
import { ApplicationState, BridgeState } from "../../store/";
import User from "./User";
import MessageWithSpinner from "../MessageWithSpinner";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

const Discovery: React.SFC<BridgeState> = ({ discoveryCompleted, error }) => {
    let showUser = discoveryCompleted && !error;
    return (
        <View style={styles.container}>
            {showUser
                ? <User />
                : <MessageWithSpinner text={error ? error : "Looking for Philips Hue Bridge..."} />}
        </View>
    )
}

const mapState = ({ bridge }: ApplicationState): BridgeState => bridge;
export default connect(mapState)(Discovery);

