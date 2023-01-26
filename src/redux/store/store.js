import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers/rootReducer';
import { rootSaga } from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware:[...middleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);