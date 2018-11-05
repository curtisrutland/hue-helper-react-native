import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Groups } from "../../../models/group";
import { ApplicationState } from "../../../store";
import GroupView from "./GroupView";
import MessageWithSpinner from "../../MessageWithSpinner";
import { Text } from "native-base";

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        paddingBottom: 10
    },
    headerText: {
        fontSize: 18,
    }
});

interface PropsFromState {
    bridgeDiscovered: boolean,
    userCreated: boolean
    groupsLoaded: boolean,
    groups: Groups
}

const GroupsContainer: React.SFC<{ groups: Groups }> = ({ groups }) => {
    const groupElements = Object.keys(groups).map(id => {
        let group = groups[id];
        return <GroupView group={group} id={id} key={id} />
    });
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Rooms</Text>
            </View>
            {groupElements}
        </>
    )
}

const Message: React.SFC<{ text: string }> = ({ text }) => {
    return (
        <View style={styles.container}>
            <MessageWithSpinner text={text} />
        </View>
    );
}

const GroupsList: React.SFC<PropsFromState> = (props) => {
    const { bridgeDiscovered, groupsLoaded, groups, userCreated } = props;
    if (!bridgeDiscovered || !userCreated) return null;
    return (
        <View style={styles.root}>
            {groupsLoaded
                ? <GroupsContainer groups={groups} />
                : <Message text="Loading Light Groups..." />}
        </View>
    )
}

function mapState(state: ApplicationState): PropsFromState {
    return {
        groups: state.groups.groups || {},
        groupsLoaded: state.groups.groupsLoaded,
        bridgeDiscovered: state.bridge.discoveryCompleted,
        userCreated: state.bridge.userCreated
    }
}

export default connect(mapState)(GroupsList);