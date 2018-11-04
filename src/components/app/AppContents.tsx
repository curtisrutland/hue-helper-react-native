import React from "react";
import { Root, Container, Content } from "native-base";
import AppHeader from "./AppHeader";
import Discovery from "../hue/Discovery";

const AppContents: React.SFC = () => {
    return (
        <Root>
            <Container>
                <AppHeader />
                <Content padder>
                    <Discovery />
                </Content>
            </Container>
        </Root>
    )
}

export default AppContents;