import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import createLoading from 'dva-loading';
import load from './models/loading';
import groupData from './models/group';
import scoreData from './models/score';
import outletData from './models/outlet';
import eliminateData from './models/eliminate';
import urlInfo from './models/urlInfo';

import cutdown from './models/cutdown';
import mobile from './models/mobile';
import showLogin from './models/loginHint';
import showBgImg from './models/showBgImg';
import fastclick from 'fastclick';
import { reducer as formReducer } from 'redux-form';

let basename = '/zhouzhuanking';
if (process.env.API_ENV === 'dev') {
  basename = '';
}
const history = createHistory({
  basename: basename,
});

const persistConfig = {
  key: 'worldCup',
  storage,
  blacklist: ['showBgImg', 'showLogin', 'cutdown', 'form', 'mobile'],
};

// 1. Initialize
let app,
  option = {
    initialState: {},
    extraReducers: {
      form: formReducer,
    },
    onReducer: reducer => {
      const newReducer = persistReducer(persistConfig, reducer);
      return newReducer;
    },
  };
if (process.env.API_ENV === 'devDist') {
  app = dva({
    ...option,
  });
} else {
  app = dva({
    history: history,
    ...option,
  });
}
// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(load);
app.model(groupData);
app.model(scoreData);
app.model(outletData);
app.model(eliminateData);
app.model(cutdown);
app.model(mobile);
app.model(showLogin);
app.model(showBgImg);
app.model(urlInfo);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
fastclick.attach(document.body, {});
export default app._store;
let $persist;
function createPersistorIfNecessary(store = app._store) {
  if (!$persist) {
    $persist = persistStore(store);
  }
  return $persist;
}
export { history, createPersistorIfNecessary, basename };
