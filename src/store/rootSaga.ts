import { all } from "redux-saga/effects";
import bridgeSaga from "./bridge/saga";
import groupsSaga from "./groups/saga";

export default function*() {
  yield all([
    bridgeSaga(),
    groupsSaga()
  ])
}