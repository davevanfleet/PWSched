import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  let store
  if (process.env.NODE_ENV === 'development'){
    store = createStore(rootReducer, preloadedState, composedEnhancers)
  } else {
    store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
  }
  return store
}