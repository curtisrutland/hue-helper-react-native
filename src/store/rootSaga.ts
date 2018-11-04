import { all } from "redux-saga/effects";
import bridgeSaga from "./bridge/saga";

export default function*() {
  yield all([
    bridgeSaga()
  ])
}