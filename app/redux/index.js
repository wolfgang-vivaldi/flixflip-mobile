import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import app from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducers = persistReducer(persistConfig, app);

const store = createStore(pReducers, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
