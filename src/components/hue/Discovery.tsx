import React from "react";
import { connect } from "react-redux";
import { ApplicationState, BridgeState } from "../../store/";
import User from "./User";
import MessageWithSpinner from "../MessageWithSpinner";

const Discovery: React.SFC<BridgeState> = ({ discoveryCompleted, error }) => {
    if (discoveryCompleted && !error) {
        return <User />;
    } else {
        return (
            <MessageWithSpinner text={error ? error : "Looking for Philips Hue Bridge..."} />
        )
    }
}

const mapState = ({ bridge }: ApplicationState): BridgeState => bridge;
export default connect(mapState)(Discovery);

