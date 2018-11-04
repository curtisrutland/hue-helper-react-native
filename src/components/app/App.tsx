import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import AppContents from "./AppContents";

const store = configureStore();

const App: React.SFC = () => {

    return (
        <Provider store={store}>
            <AppContents>

            </AppContents>
        </Provider>
    )
}

export default App;