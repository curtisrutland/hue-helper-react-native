import React from "react";
import {
    Header, Left, Title,
    Body, Right, Button, Icon
} from "native-base";
import { StyleSheet, ViewStyle } from "react-native";
import { clearLocalStorage } from "../../api/api";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    body: {
        justifyContent: "center"
    }
});

const AppHeader: React.SFC = () => {
    return (
        <Header>
            <Left>
                <Link to="/">
                    <Button transparent>
                        <Icon name="home" />
                    </Button>
                </Link>
            </Left>
            <Body style={styles.body as ViewStyle}>
                <Title>Test</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="trash"
                        onPress={() => clearLocalStorage()} />
                </Button>
            </Right>
        </Header>
    );
}

export default AppHeader;