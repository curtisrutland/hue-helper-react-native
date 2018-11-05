import React from "react";
import { connect } from "react-redux";
import { View, Slider, Switch } from "react-native";
import { Text } from "native-base";
import { Group, GroupApiAction } from "../../../models/group";
import { GroupsActions } from "../../../store/groups";
import { Dispatch } from "redux";

interface OwnProps {
    group: Group,
    id: string
}

interface PropsFromDispatch {
    setGroupAction: (groupId: string, apiAction: GroupApiAction) => void;
}

type Props = OwnProps & PropsFromDispatch;

interface State {
    brightness: number,
    on: boolean
}

class GroupView extends React.Component<Props, State> {
    state = {
        brightness: this.props.group.action.bri || 1,
        on: this.props.group.state.any_on
    };

    togglePower = () => {
        const action: GroupApiAction = { on: !this.state.on };
        this.props.setGroupAction(this.props.id, action);
        this.setState({ on: !this.state.on });
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.group.action.bri === prevProps.group.action.bri) return;
        if (this.props.group.action.bri !== this.state.brightness) {
            console.log(`${this.props.group.action.bri} !== ${this.state.brightness}`)
            this.setState({ brightness: this.props.group.action.bri || 1 });
        }
    }

    handleBrightnessChanged = (brightness: number) => {
        this.setState({ brightness });
        console.log(brightness);
    }

    render() {
        console.log(this.props.group.action.bri);
        return (
            <View>
                <Text>{this.props.group.name}</Text>
                <Switch value={this.state.on} onValueChange={this.togglePower} />
                <Slider value={this.state.brightness}
                    onValueChange={this.handleBrightnessChanged}
                    minimumValue={1} maximumValue={255} step={1} />
            </View>
        )
    }
}

function mapDispatch(dispatch: Dispatch): PropsFromDispatch {
    return {
        setGroupAction(groupId, apiAction) {
            dispatch(GroupsActions.setGroupAction({ groupId, apiAction }))
        }
    }
}

export default connect(null, mapDispatch)(GroupView);