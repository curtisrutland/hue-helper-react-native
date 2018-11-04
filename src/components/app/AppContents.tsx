import React from "react";
import { Root, Container, Content, StyleProvider } from "native-base";
import AppHeader from "./AppHeader";
import Discovery from "../hue/Discovery";

import getTheme from "../../theme/components";
import commonColor from "../../theme/variables/commonColor";

const AppContents: React.SFC = () => {
    const theme = getTheme(commonColor);
    return (
        <StyleProvider style={theme}>
            <Root>
                <Container>
                    <AppHeader />
                    <Content padder>
                        <Discovery />
                    </Content>
                </Container>
            </Root>
        </StyleProvider>
    )
}

export default AppContents;