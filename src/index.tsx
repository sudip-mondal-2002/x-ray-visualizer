import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {fileStore} from "./store/FileDataStore";
import App from "./App";

const rootElement = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <Provider store={fileStore}>
            <App/>
        </Provider>
    </StrictMode>
);
