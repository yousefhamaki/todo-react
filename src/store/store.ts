import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  compose,
} from "redux";
import todoReducer from "./reducers/todo.reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todoReducer,
});

// Add Redux DevTools extension support
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
