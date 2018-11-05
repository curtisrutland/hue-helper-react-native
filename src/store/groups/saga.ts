import { takeLatest, takeEvery, put } from "redux-saga/effects";
import { getType, isActionOf } from "typesafe-actions";
import { toast } from "../../helpers";
import { GroupsActions, GroupsActionsType } from "./";
import hue from '../../api/hue';
import { Groups } from "../../models/group";

function* watchLoadGroups() {
    try {
        const results: Groups = yield hue.getGroups();
        yield put(GroupsActions.loadGroupsSuccess(results));
    } catch (err) {
        toast("error loading groups");
        yield put(GroupsActions.loadGroupsError("Error loading groups."));
    }
}

function* watchSetGroupAction(action: GroupsActionsType) {
    if (isActionOf(GroupsActions.setGroupAction, action)) {
        const { apiAction, groupId } = action.payload;
        yield hue.setGroupAction(groupId, apiAction);
        yield put(GroupsActions.loadGroups());
    }
}

export default function* () {
    yield takeLatest(getType(GroupsActions.loadGroups), watchLoadGroups);
    yield takeEvery(getType(GroupsActions.setGroupAction), watchSetGroupAction);
}