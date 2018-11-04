import { takeLatest, put } from "redux-saga/effects";
import { BridgeActions } from "./";
import { getType } from "typesafe-actions";
import hue from '../../api/hue';

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
        console.log("loaded saved user");
    } else {
        console.log("no stored user");
    }
}

export default function* () {
    yield takeLatest(getType(BridgeActions.discover), watchDiscover);
}