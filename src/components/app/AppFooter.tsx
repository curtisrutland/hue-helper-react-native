import React from "react";
import { connect } from "react-redux";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { Dispatch } from "redux";
import { NavigationActions, NavigationState, AppTabNames } from "../../store/navigation";
import { ApplicationState } from "../../store/";

interface PropsFromDispatch {
    setActiveTab: (tab: AppTabNames) => void;
}

type Props = NavigationState & PropsFromDispatch;

const AppFooter: React.SFC<Props> = ({ activeTab, showNav, setActiveTab }) => {
    const handleTab = (name: AppTabNames) => () => setActiveTab(name);
    return showNav ? (
        <Footer>
            <FooterTab>
                <Button vertical active={activeTab === "Groups"} onPress={handleTab("Groups")}>
                    <Icon name="home" />
                    <Text>Rooms</Text>
                </Button>
                <Button vertical active={activeTab === "Lights"} onPress={handleTab("Lights")}>
                    <Icon name="bulb" />
                    <Text>Lights</Text>
                </Button>
            </FooterTab>
        </Footer>
    ) : null;
}

const mapState = ({ navigation }: ApplicationState) => navigation;
const mapDispatch = (dispatch: Dispatch): PropsFromDispatch => {
    return {
        setActiveTab: tab => dispatch(NavigationActions.setActiveTab(tab))
    }
}
export default connect(mapState, mapDispatch)(AppFooter);