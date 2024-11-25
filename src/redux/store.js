import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  { user,todos } from './reducers.js'
import {
    persistStore, persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
import {
    createStateSyncMiddleware,
    initMessageListener,
} from "redux-state-sync";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducers=combineReducers({
    todos: todos,
    user:user
})

const persistedReducers = persistReducer(persistConfig, rootReducers);
//  const store = configureStore({
//     reducer: {
//          todos: persistedReducers,
//      },
//  })
const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(createStateSyncMiddleware({
            blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
        })).concat(logger),
})

initMessageListener(store)
export { store }
export const persistor = persistStore(store)
