import { userData } from "./models/userData";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import auth from "./models/auth";
import { init } from "@rematch/core";

const persistPlugin:any = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: ["auth", "userData"],
});

const middlewares: any[] = [];
const enhancers: any[] = [];

const models = {
  auth,
  userData,
};

const store = init({
  models,
  redux: {
    middlewares,
    enhancers,
    rootReducers: { RESET_APP: () => undefined },
  },
  plugins: [persistPlugin],
});

export const { dispatch } = store;

export default store;
