export interface GroupState {
    all_on: boolean;
    any_on: boolean;
}

export interface GroupApiAction {
    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    effect?: string;
    xy?: number[];
    ct?: number;
    alert?: string;
    colormode?: string;
}

export interface Group {
    name: string;
    lights: string[];
    sensors: any[];
    type: string;
    state: GroupState;
    recycle: boolean;
    class: string;
    action: GroupApiAction;
}

export interface Groups {
    [id: string]: Group;
}

export interface UpdateGroupPayload {
    groupId: string;
    action: GroupApiAction
}

const defaultGroupAction: GroupApiAction = {
    on: false,
    bri: 1,
    hue: 0,
    sat: 0,
    effect: "",
    xy: [],
    ct: 0,
    alert: "",
    colormode: ""
}

const defaultGroupState: GroupState = {
    all_on: false,
    any_on: false
}

export const defaultGroup: Group = {
    name: "",
    lights: [],
    sensors: [],
    type: "",
    state: { ...defaultGroupState },
    recycle: false,
    class: "",
    action: { ...defaultGroupAction }
}

export const defaultGroups: Groups = {
    "1": { ...defaultGroup }
}

const bright: GroupApiAction = { bri: 254, hue: 8402, sat: 140 };
const dim: GroupApiAction = { bri: 77, hue: 8402, sat: 140 };
const night: GroupApiAction = { bri: 30, hue: 8402, sat: 140 };

export const actionPresets = { bright, dim, night };