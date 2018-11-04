import React from "react";
import {
    Header, Left, Title,
    Body, Right, Button, Icon, ActionSheet
} from "native-base";
import { Platform } from "react-native";
import { clearLocalStorage } from "../../api/api";
import { toast } from "../../helpers";

const DELETE_MESSAGE = "Delete Local Data";

async function handleTrashPress() {
    await clearLocalStorage();
    toast("Data cleared!");
}

function handleMenuPress() {
    // ActionSheet.show({
    //     options: [{ text: "Delete Local Data", icon: "trash" }],
    //     destructiveButtonIndex: 0
    // }, index => {
    //     toast(index != null ? index.toString() : "Nothing");
    // });
    const sheet = Platform.select({
        ios: () => {
            ActionSheet.show({
                options: ["Cancel", DELETE_MESSAGE],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            }, index => {
                if (index === 1) {
                    handleTrashPress();
                }
            })
        },
        android: () => {
            ActionSheet.show({
                options: [{ text: DELETE_MESSAGE, icon: "trash", iconColor: "red" }],
                destructiveButtonIndex: 0,
            }, index => {
                if (index === 0) {
                    handleTrashPress();
                }
            })
        }
    });
    if (sheet) sheet();
}

const AppHeader: React.SFC = () => {
    let button = (
        <Button transparent onPress={handleMenuPress}>
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
    return (
        <Header>
            {left}
            <Body>
                <Title>Hue Helper</Title>
            </Body>
            {right}
        </Header>
    );
}

export default AppHeader;