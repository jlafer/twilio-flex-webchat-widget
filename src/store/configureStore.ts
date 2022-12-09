import {
  createStore, compose, applyMiddleware, combineReducers, Reducer, Store
} from "redux";
import thunk from "redux-thunk";

interface ReducerDict {
  [index: string]: Reducer;
};

interface StoreWithAsyncReducers extends Store {
  asyncReducers: ReducerDict;
};

export interface StoreWithInjector extends StoreWithAsyncReducers {
  injectReducer: (key: string, asyncReducer: Reducer) => void;
};

function createReducer(staticReducers: ReducerDict, asyncReducers: ReducerDict): Reducer {
  return combineReducers({...staticReducers, ...asyncReducers})
}

// Configure the store
export default function configureStore(reducers: ReducerDict) {
  const store: Store = createStore(
    createReducer(reducers, {}),
    compose( applyMiddleware(thunk) )
  );

  // Add a dictionary to keep track of the registered async reducers
  const storeWithAsyncReducers: StoreWithAsyncReducers = Object.assign(store, {asyncReducers: {}});

  // Add an inject reducer function
  return Object.assign(storeWithAsyncReducers,
    {injectReducer: (key: string, asyncReducer: Reducer) => {
      storeWithAsyncReducers.asyncReducers[key] = asyncReducer;
      storeWithAsyncReducers.replaceReducer(createReducer(reducers, storeWithAsyncReducers.asyncReducers))
    }}
  );
}
