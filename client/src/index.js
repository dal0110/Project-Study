import "core-js/stable";
import "core-js/es/set";
import "core-js/es/map";
import "regenerator-runtime/runtime";
import "raf/polyfill";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'app.jsx';
import * as serviceWorker from "./serviceWorker";

import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from 'modules/reducers';
import { rootReducer, rootSaga } from "./modules/reducers"
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk,
// )(createStore);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider
//       store={createStoreWithMiddleware(
//         Reducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//           window.__REDUX_DEVTOOLS_EXTENSION__(),
//       )}
//     >
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);