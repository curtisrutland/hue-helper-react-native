import React from "react";
import { connect } from "react-redux";
import { ApplicationState, BridgeState } from "../../store/";
import MessageWithSpinner from "../MessageWithSpinner";

const User: React.SFC<BridgeState> = ({ userCreated }) => {
    if (userCreated) {
        return null;
    } else {
        return (
            <MessageWithSpinner text="Press the Connect button on the Philips Hue Bridge..." />
        )
    }
}

const mapState = ({ bridge }: ApplicationState): BridgeState => bridge;
export default connect(mapState)(User);

