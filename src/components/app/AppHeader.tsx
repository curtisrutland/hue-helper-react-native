import React from "react";
import { connect } from "react-redux";
import {
    Header, Left, Title, Subtitle,
    Body, Right, Button, Icon, ActionSheet
} from "native-base";
import { Platform } from "react-native";
import { Dispatch } from "redux";
import { BridgeActions } from "../../store/bridge";
import { ApplicationState } from "../../store";

const DELETE_MESSAGE = "Delete Local Data";

function handleMenuPress(clearAllData: () => void) {
    return function () {
        const sheet = Platform.select({
            ios: () => {
                ActionSheet.show({
                    options: ["Cancel", DELETE_MESSAGE],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                }, index => {
                    if (index === 1) {
                        clearAllData();
                    }
                })
            },
            android: () => {
                ActionSheet.show({
                    options: [{ text: DELETE_MESSAGE, icon: "trash", iconColor: "red" }],
                    destructiveButtonIndex: 0,
                }, index => {
                    if (index === 0) {
                        clearAllData();
                    }
                })
            }
        });
        if (sheet) sheet();
    }
}

interface PropsFromDispatch {
    clearAllData: () => void
}

interface PropsFromState {
    subtitle: string | undefined;
}

type Props = PropsFromDispatch & PropsFromState;

const AppHeader: React.SFC<Props> = ({ clearAllData, subtitle }) => {
    let button = (
        <Button transparent onPress={handleMenuPress(clearAllData)}>
            <Icon name="menu" />
        </Button>
    );
    let left = Platform.select({
        ios: <Left />,
        android: <Left>{button}</Left>
    });
    let right = Platform.select({
        ios: <Right>{button}</Right>,
        android: <Right />
    })
    let sub = !!subtitle
        ? <Subtitle>{subtitle}</Subtitle>
        : null;
    return (
        <Header>
            {left}
            <Body>
                <Title>Hue Helper</Title>
                {sub}
            </Body>
            {right}
        </Header>
    );
}

function mapStateToProps({ navigation }: ApplicationState): PropsFromState {
    if (navigation.showNav) {
        return { subtitle: navigation.activeTab === "Groups" ? "Rooms" : "Lights" };
    }
    return { subtitle: undefined };
}

function mapDispatchToProps(dispatch: Dispatch): PropsFromDispatch {
    return {
        clearAllData: () => dispatch(BridgeActions.clearAllData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);