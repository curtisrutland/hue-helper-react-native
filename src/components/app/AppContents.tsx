import React from "react";
import { Root, Container, Content, StyleProvider } from "native-base";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Discovery from "../hue/Discovery";
import Groups from "../hue/Groups";
import getTheme from "../../theme/components";
import commonColor from "../../theme/variables/commonColor";

const AppContents: React.SFC = () => {
    const theme = getTheme(commonColor);
    return (
        <StyleProvider style={theme}>
            <Root>
                <Container>
                    <AppHeader />
                    <Content contentContainerStyle={{ flexGrow: 1 }} padder>
                        <Discovery />
                        <Groups />
                    </Content>
                    <AppFooter />
                </Container>
            </Root>
        </StyleProvider>
    )
}

export default AppContents;