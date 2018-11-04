import { takeLatest, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { getType } from "typesafe-actions";
import { toast } from "../../helpers";
import { BridgeActions } from "./";
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
            toast("Linked successfully!");
            break;
        } else {
            toast(result);
            yield delay(5000);
        }
    }
}

export default function* () {
    yield takeLatest(getType(BridgeActions.discover), watchDiscover);
}