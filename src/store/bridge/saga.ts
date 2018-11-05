import { takeLatest, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { getType } from "typesafe-actions";
import { toast } from "../../helpers";
import { BridgeActions } from "./";
import { GroupsActions } from "../groups";
import hue from '../../api/hue';
import { clearLocalStorage } from "../../api/api";
import { NavigationActions } from "../navigation";

//const LINK_SUCCESS_MESSAGE = "Linked to Hue Bridge";

function* watchDiscover() {
    const result = yield hue.discover();
    console.log(result);
    if (result) {
        yield put(BridgeActions.discoveryCompleted());
        console.log(`Discovered bridge: ${hue.apiRootUrl}`)
        yield discoverUser();
    } else {
        yield put(BridgeActions.discoveryError("failed"));
    }
}

function* discoverUser() {
    console.log("looking for user");
    const result: boolean = yield hue.getStoredUsername();
    if (result) {
        yield put(BridgeActions.createUserSuccess());
        //toast(LINK_SUCCESS_MESSAGE);
    } else {
        console.log("no stored user, creating");
        yield createUser();
    }
}

function* createUser() {
    yield delay(2000);
    while (true) {
        let result: true | string = yield hue.createUser();
        if (result === true) {
            yield put(BridgeActions.createUserSuccess());
            //toast(LINK_SUCCESS_MESSAGE);
            break;
        } else {
            toast(result);
            yield delay(5000);
        }
    }
}

function* watchCreateUserSuccess() {
    yield put(NavigationActions.setShowNav(true));
    yield put(GroupsActions.loadGroups());
}

function* watchClearAllData() {
    yield clearLocalStorage();
    toast("Cleared all local data.");
    yield put(BridgeActions.discover());
}

export default function* () {
    yield takeLatest(getType(BridgeActions.discover), watchDiscover);
    yield takeLatest(getType(BridgeActions.createUserSuccess), watchCreateUserSuccess);
    yield takeLatest(getType(BridgeActions.clearAllData), watchClearAllData);
}