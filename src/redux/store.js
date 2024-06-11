import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sliceAlDia from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, sliceAlDia);

export const store = configureStore({
  reducer: {
    data_aldia: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Desactiva la verificación de serialización
  }),
});

export const persistor = persistStore(store);
