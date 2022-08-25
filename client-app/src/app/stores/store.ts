/****************************************
 * This is essentially the combineReducers function in Redux.
 ****************************************/

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from './CommonStore';

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

// add stores here
export const store: Store = {
    activityStore: new ActivityStore(), 
    commonStore: new CommonStore()
}

// all of our stores make up the context
export const StoreContext = createContext(store);

// create a react hook 
export const useStore = () => useContext(StoreContext);
