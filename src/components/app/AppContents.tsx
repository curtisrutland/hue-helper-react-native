import React from "react";
import { Container, Content } from "native-base";
import AppHeader from "./AppHeader";

const AppContents: React.SFC = ({ children }) => {
    return (
        <Container>
            <AppHeader />
            <Content padder>
                {children}
            </Content>
        </Container>
    )
}

export default AppContents;