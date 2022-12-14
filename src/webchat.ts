import merge from "lodash.merge";

import { StoreWithInjector } from "./store/configureStore";
import { sessionDataHandler } from "./sessionDataHandler";
import { initConfig } from "./store/actions/initActions";
import { ConfigState } from "./store/definitions";
import { injectWebchatReducers } from "./store/store";

const defaultConfig: ConfigState = {
    serverUrl: "http://localhost:3001",
    theme: {
        isLight: true
    },
    fileAttachment: {
        enabled: true,
        maxFileSize: 16777216, // 16 MB
        acceptedExtensions: ["jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "txt"]
    },
    transcript: {
        downloadEnabled: false,
        emailEnabled: false,
        emailSubject: (agentNames) => {
            let subject = "Transcript of your chat";
            if (agentNames.length > 0) {
                subject = subject.concat(` with ${agentNames[0]}`);
                agentNames.slice(1).forEach((name) => (subject = subject.concat(` and ${name}`)));
            }
            return subject;
        },
        emailContent: (customerName, transcript) => {
            return `<div><h1 style="text-align:center;">Chat Transcript</h1><p>Hello ${customerName},<br><br>Please see below your transcript, with any associated files attached, as requested.<br><br>${transcript}</p></div>`;
        }
    }
};

function webchatInit(config: ConfigState, store: StoreWithInjector) {
    const mergedConfig = merge({}, defaultConfig, config);
    injectWebchatReducers(store);
    sessionDataHandler.setEndpoint(mergedConfig.serverUrl);
    store.dispatch(initConfig(mergedConfig));
}

export default webchatInit;
