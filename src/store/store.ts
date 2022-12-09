import { StoreWithInjector } from "./configureStore";
import { ChatReducer } from "./chat.reducer";
import { ConfigReducer } from "./config.reducer";
import { NotificationReducer } from "./notification.reducer";
import { SessionReducer } from "./session.reducer";

export const injectWebchatReducers = (store: StoreWithInjector) => {
    store.injectReducer("session", SessionReducer);
    store.injectReducer("chat", ChatReducer);
    store.injectReducer("config", ConfigReducer);
    store.injectReducer("notifications", NotificationReducer);
};
